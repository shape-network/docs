import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://docs.shape.network';
const decode = (text) =>
  text.replace(
    /&(apos|quot|amp|lt|gt|nbsp);/g,
    (_, key) => ({ apos: "'", quot: '"', amp: '&', lt: '<', gt: '>', nbsp: ' ' })[key]
  );

// Protect code before processing MDX: imports and JSX inside examples are content.
export function protectCode(text) {
  const saved = [];
  const save = (value) => {
    saved.push(value);
    return `\u0000CODE${saved.length - 1}\u0000`;
  };
  let fence;
  let block = [];
  const lines = [];
  for (const line of text.split('\n')) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (!fence && marker) {
      fence = marker[1];
      block = [line];
    } else if (fence) {
      block.push(line);
      if (
        marker &&
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length &&
        /^ {0,3}(`{3,}|~{3,})\s*$/.test(line)
      ) {
        lines.push(save(block.join('\n')));
        fence = undefined;
      }
    } else lines.push(line);
  }
  if (fence) throw new Error('Unclosed code fence');
  const protectedText = lines.join('\n').replace(/(`+)([^\n]*?)\1/g, save);
  return {
    text: protectedText,
    restore: (value) => value.replace(/\u0000CODE(\d+)\u0000/g, (_, index) => saved[Number(index)]),
  };
}

function attr(attributes, name, paths) {
  const literal = attributes.match(new RegExp(`\\b${name}="([^"]*)"`));
  if (literal) return decode(literal[1]);
  const ref = attributes.match(new RegExp(`\\b${name}=\\{paths\\.(\\w+)\\}`));
  if (ref && paths[ref[1]]) return paths[ref[1]];
  throw new Error(`Unsupported or missing ${name}: ${attributes}`);
}

function renderJsx(text, components, paths) {
  text = text.replace(/<([A-Z]\w*)\s*\/>/g, (_, name) => {
    if (!(name in components)) throw new Error(`Unsupported component: ${name}`);
    return renderJsx(components[name], components, paths);
  });
  text = text.replace(/<Card\s+([\s\S]*?)\/>/g, (_, attributes) => {
    const title = attr(attributes, 'title', paths);
    const href = attr(attributes, 'href', paths);
    const subtitle = /\bsubtitle=/.test(attributes)
      ? `: ${attr(attributes, 'subtitle', paths)}`
      : '';
    return `\n- [${title}](${href})${subtitle}\n`;
  });
  text = text.replace(
    /<Link\s+([\s\S]*?)>([\s\S]*?)<\/Link>/g,
    (_, attributes, label) =>
      `[${label.trim().replace(/\s+/g, ' ')}](${attr(attributes, 'href', paths)})`
  );
  text = text
    .replace(/<\/?Cards>/g, '')
    .replace(/<br\s*\/>/g, '\n')
    .replace(/\{' '\}/g, ' ');
  text = text.replace(
    /<Callout(?:\s+type="(\w+)")?>([\s\S]*?)<\/Callout>/g,
    (_, type, body) =>
      '\n' +
      (type === 'warning' ? '> Warning:\n>\n' : '') +
      body
        .trim()
        .split('\n')
        .map((line) => '> ' + line.trim())
        .join('\n') +
      '\n'
  );
  if (/<\/?[A-Za-z][^>]*>/.test(text)) throw new Error('Unconverted JSX/HTML in document');
  return decode(text);
}

export function convert(
  source,
  { components = {}, paths = {}, routes = new Map(), route = '/' } = {}
) {
  const code = protectCode(source);
  let text = code.text.replace(/^---\n[\s\S]*?\n---\n/, '');
  text = text.replace(/^import\s+[\s\S]*?;\s*$/gm, '');
  text = renderJsx(text, components, paths);
  text = text.replace(/\]\(([^\s)]+)\)/g, (_, href) => {
    if (href.startsWith('#')) return `](${href})`;
    const url = new URL(href, ORIGIN + route);
    if (url.origin === ORIGIN) {
      const markdown = routes.get(url.pathname.replace(/\/$/, '') || '/');
      if (markdown) url.pathname = markdown;
      else if (!path.extname(url.pathname)) throw new Error(`Unmapped internal link: ${href}`);
    }
    return `](${url.href})`;
  });
  return (
    code.restore(
      text
        .replace(/[ \t]+$/gm, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    ) + '\n'
  );
}

async function walk(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(full)));
    else if (/\.mdx?$/.test(entry.name)) result.push(full);
  }
  return result.sort();
}

export async function generate(root) {
  const content = path.join(root, 'content');
  const publicDir = path.join(root, 'public');
  const pathsSource = await readFile(path.join(root, 'paths.ts'), 'utf8');
  const paths = Object.fromEntries(
    [...pathsSource.matchAll(/(\w+):\s*'([^']*)'/g)].map((match) => [match[1], match[2]])
  );
  const components = {};
  for (const name of ['cards.tsx', 'callouts.tsx']) {
    const source = await readFile(path.join(root, 'components', name), 'utf8');
    for (const match of source.matchAll(
      /export const (\w+)[\s\S]*?return \(([\s\S]*?)\n  \);\n};/g
    ))
      components[match[1]] = match[2];
  }
  const records = (await walk(content)).map((file) => {
    const relative = path
      .relative(content, file)
      .replaceAll(path.sep, '/')
      .replace(/\.mdx?$/, '');
    const route = '/' + relative.replace(/(^|\/)index$/, '');
    return { file, route: route.replace(/\/$/, '') || '/', markdown: '/' + relative + '.md' };
  });
  const routes = new Map(records.map((record) => [record.route, record.markdown]));
  if (routes.size !== records.length) throw new Error('Duplicate content routes');
  const rendered = [];
  for (const record of records) {
    const source = await readFile(record.file, 'utf8');
    const body = convert(source, { components, paths, routes, route: record.route });
    const title = body.match(/^# (.+)$/m)?.[1];
    if (!title) throw new Error(`Missing title: ${record.file}`);
    const descriptions = {
      '/technical-details/network-information':
        'Mainnet and testnet chain IDs, ETH gas currency, RPC endpoints, and explorers.',
      '/technical-details/contract-addresses':
        'Official network infrastructure contract addresses.',
      '/the-stack':
        'Dynamic NFT achievements, participation, and medals across the Shape ecosystem.',
      '/tutorials/registering-contract-gasback':
        'Choose dashboard or programmatic contract registration for Gasback.',
      '/building-on-shape/ai':
        'Shape MCP, AI integration examples, and agent development guidance.',
      '/tools/node-providers': 'Public and provider RPC endpoints for mainnet and testnet.',
      '/tools/data-indexers': 'NFT queries, indexing services, and data APIs.',
      '/tools/oracles/gelato-vrf':
        'Request verifiable randomness from smart contracts using Gelato VRF.',
    };
    const paragraph = body
      .split('\n\n')
      .map((block) => block.trim())
      .find((block) => block && !/^(#|>|-|\d+\.|\||`|~)/.test(block));
    let description = (descriptions[record.route] || paragraph || 'Documentation for ' + title)
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (description.length > 220)
      description = description.slice(0, 217).replace(/\s+\S*$/, '') + '...';
    rendered.push({ ...record, title, description, body });
  }

  // Remove only previously generated pages, so deleted source pages cannot linger.
  const manifestPath = path.join(publicDir, '.ai-docs-manifest.json');
  let previous = [];
  try {
    previous = JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  for (const relative of previous) {
    const target = path.resolve(publicDir, relative);
    if (!target.startsWith(path.resolve(publicDir) + path.sep) || !relative.endsWith('.md'))
      throw new Error('Invalid generated file manifest');
    await rm(target, { force: true });
  }
  await mkdir(publicDir, { recursive: true });
  for (const record of rendered) {
    const file = path.join(publicDir, record.markdown);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, record.body);
  }
  const sections = [
    [
      'Start Here',
      ['/', '/wallet-setup', '/quick-start', '/technical-details/network-information'],
    ],
    [
      'Gasback and Fees',
      [
        '/gasback',
        '/building-on-shape/transaction-fees',
        '/tutorials/registering-contract-gasback',
      ],
    ],
    [
      'Build Applications',
      [
        '/quick-start/connect-to-shape',
        '/quick-start/deploy-a-contract',
        '/building-on-shape/builder-kit',
        '/tutorials/mint-nft-collection',
        '/building-on-shape/ai',
      ],
    ],
    [
      'Explore and Operate',
      [
        '/the-stack',
        '/technical-details/contract-addresses',
        '/technical-details/run-a-node',
        '/building-on-shape/differences-ethereum-shape',
      ],
    ],
  ];
  const used = new Set();
  let index =
    '# Shape Documentation\n\n> Official technical documentation for Shape, an Ethereum L2 built on the OP Stack and part of the Optimism Superchain.\n\n' +
    'Mainnet chain ID: 360. Shape Sepolia chain ID: 11011. Gas currency: ETH. Gasback shares 80% of L2 sequencer fees with registered contract owners, excluding L1 data fees.\n\n' +
    'Links below lead to Markdown generated from the same source as the website. Follow the relevant pages for full context. For current $SHAPE token and governance information, see https://shape.network/token.\n\n';
  for (const [title, entries] of [
    ...sections,
    ['Tools and Further Reading', rendered.map((record) => record.route)],
  ]) {
    const selected = entries.filter((route) => !used.has(route));
    index += `## ${title}\n\n`;
    for (const route of selected) {
      const record = rendered.find((record) => record.route === route);
      if (!record) throw new Error(`Missing curated route: ${route}`);
      used.add(route);
      index += `- [${record.title}](${ORIGIN}${record.markdown}): ${record.description}\n`;
    }
    index += '\n';
  }
  index +=
    '## Optional\n\n- [All technical documentation](' +
    ORIGIN +
    '/llms-full.txt): All generated pages in one file. Use individual pages for narrower questions.\n';
  await writeFile(path.join(publicDir, 'llms.txt'), index);
  const full =
    '# Shape Technical Documentation\n\nGenerated from the official documentation source. This is the technical corpus; token and governance information is maintained at https://shape.network/token.\n\n' +
    rendered
      .map(
        (record) =>
          `---\n\nCanonical page: ${ORIGIN}${record.route}\nMarkdown page: ${ORIGIN}${record.markdown}\n\n${record.body}`
      )
      .join('\n');
  await writeFile(path.join(publicDir, 'llms-full.txt'), full);
  await writeFile(
    manifestPath,
    JSON.stringify(
      rendered.map((record) => record.markdown.slice(1)),
      null,
      2
    ) + '\n'
  );
  return { pages: rendered.length, bytes: Buffer.byteLength(full) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await generate(path.resolve(process.argv[2] || '.'));
  console.log(
    `Generated ${result.pages} Markdown pages, llms.txt, and llms-full.txt (${result.bytes} bytes).`
  );
}
