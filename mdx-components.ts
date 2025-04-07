import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import {
  StackCallout,
  GasbackCallout,
  AddToStackCallout,
  NetworkInformationCallout,
  OtomsCallout,
  TransactionFeesCallout,
  RegisterGasbackCallout,
  AlchemyApiCallout,
} from '@components/callouts';
import { ProjectCards, SuperchainIncentivesCards } from '@components/cards';

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
    RegisterGasbackCallout,
    ProjectCards,
    AlchemyApiCallout,
    SuperchainIncentivesCards,
  };
}
