import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import {
  StackCallout,
  GasbackCallout,
  AddToStackCallout,
  NetworkInformationCallout,
} from '@components/callouts';

const themeComponents = getThemeComponents();

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components,
    GasbackCallout,
    StackCallout,
    AddToStackCallout,
    NetworkInformationCallout,
  };
}
