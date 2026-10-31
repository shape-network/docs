import test from 'node:test';
import assert from 'node:assert/strict';
import { convert, generate } from './generate-ai-docs.mjs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

test('code examples retain imports, JSX, placeholders, and exports', () => {
  const source =
    '# Test\n\n```tsx\nimport { x } from "x";\nexport const a = <Card />;\n```\n\nKeep `<ADDRESS>` as a placeholder.\n';
  assert.equal(convert(source), source);
});
test('multiline MDX imports and frontmatter are removed', () => {
  const source = '---\ntitle: Test\n---\nimport {\n A, B\n} from "components";\n\n# Test\n';
  assert.equal(convert(source), '# Test\n');
});
test('cards keep descriptions and target generated Markdown', () => {
  const output = convert('# Test\n<Card title="Next" subtitle="Details" href="/next" />', {
    routes: new Map([['/next', '/next.md']]),
  });
  assert.match(output, /\[Next\]\(https:\/\/docs.shape.network\/next.md\): Details/);
});
test('component warnings and source-driven links survive', () => {
  const output = convert('# Test\n<Warning />', {
    components: {
      Warning:
        '<Callout type="warning">Do not register in the constructor. <Link href={paths.help}>Help</Link></Callout>',
    },
    paths: { help: 'https://example.com/help' },
  });
  assert.match(output, /> Warning:/);
  assert.match(output, /Do not register in the constructor/);
  assert.match(output, /\[Help\]\(https:\/\/example.com\/help\)/);
});
test('unsupported components, broken internal links, and broken fences fail loudly', () => {
  assert.throws(() => convert('# Test\n<Unknown />'), /Unsupported component/);
  assert.throws(() => convert('# Test\n[Lost](/missing)'), /Unmapped internal link/);
  assert.throws(() => convert('# Test\n```ts\nbroken'), /Unclosed code fence/);
});
test('fragment links and HTML entities are preserved correctly', () => {
  assert.equal(convert('# Test\n\nIt&apos;s [here](#test).\n'), "# Test\n\nIt's [here](#test).\n");
});

// Optional integration test against the actual repository, not fabricated content.
const repo = process.env.SHAPE_DOCS_TEST_ROOT;
if (repo)
  test('every source code block is preserved and generation is deterministic', async () => {
    const { pages } = await generate(repo);
    const manifest = JSON.parse(
      await readFile(path.join(repo, 'public/.ai-docs-manifest.json'), 'utf8')
    );
    assert.equal(manifest.length, pages);
    const files = new Set(manifest);
    const originalIndex = await readFile(path.join(repo, 'public/llms.txt'), 'utf8');
    const blocks = (value) => value.match(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm) || [];
    for (const relative of manifest) {
      const output = await readFile(path.join(repo, 'public', relative), 'utf8');
      const source = await readFile(
        path.join(repo, 'content', relative.replace(/\.md$/, '.mdx')),
        'utf8'
      );
      assert.deepEqual(blocks(output), blocks(source), relative);
      for (const match of output.matchAll(
        /\]\(https:\/\/docs\.shape\.network\/([^\s)]+\.md)(?:#[^)]*)?\)/g
      ))
        assert.ok(files.has(match[1]), `${relative}: missing ${match[1]}`);
    }
    await generate(repo);
    assert.equal(await readFile(path.join(repo, 'public/llms.txt'), 'utf8'), originalIndex);
  });
