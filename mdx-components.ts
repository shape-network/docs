import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import {
  StackCallout,
  GasbackCallout,
  AddToStackCallout,
  NetworkInformationCallout,
  OtomsCallout,
  TransactionFeesCallout,
} from '@components/callouts';
import { ProjectCards } from '@components/cards';

const themeComponents = getThemeComponents();

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components,
    GasbackCallout,
    StackCallout,
    AddToStackCallout,
    NetworkInformationCallout,
    OtomsCallout,
    TransactionFeesCallout,
    ProjectCards,
  };
}
