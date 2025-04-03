import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import { GasbackCallout } from '@components/gasback-callout';

const themeComponents = getThemeComponents();

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components,
    GasbackCallout,
  };
}
