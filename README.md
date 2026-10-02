# Welcome to Shape Docs!

## Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Repository Structure

- `/app` - Next.js application files
- `/components` - React components used in the documentation
- `/content` - Documentation content written in MDX
- `/public` - Static assets
- `/lib` - Utility functions and shared code

## Links

- [Shape Website](https://shape.network)
- [Documentation](https://docs.shape.network)
- [Twitter/X](https://x.com/shape)
- [Discord](https://discord.com/invite/shape-l2)

## Contributing

Contributions to improve the documentation are welcome. Please feel free to submit pull requests with corrections or enhancements.

If you have feedback, please open an issue or reach out to [@williamhzo](https://x.com/williamhzo) or on our [Discord](https://discord.com/invite/shape-l2).

## License

All content is © Shape Factory.

## Documentation for AI tools

The production build generates `/llms.txt`, `/llms-full.txt`, and Markdown versions of all documentation pages from `content/` and the shared cards and callouts. Each HTML page links to its Markdown alternative. `/llms.txt` groups entry points by task, while `/llms-full.txt` contains the technical documentation corpus.

```bash
bun run generate:ai-docs
bun run test:ai-docs
```

Edit the MDX source or shared components, then regenerate the assets. Do not edit generated Markdown directly. The converter handles the current static MDX patterns and stops on unknown components, unclosed code fences, or unmapped documentation links. Add conversion support and a test when introducing a new MDX component. Fenced code blocks are preserved verbatim.

Generated files under `public/` are ignored by Git. Both development and production scripts generate them from the existing source before starting Next.js. `.ai-docs-manifest.json` records the generated page paths so deleted pages are removed on regeneration and HTML alternatives use the same route map. Titles, summaries, examples, and component text come from the original content; only navigation grouping is configured in the generator.
