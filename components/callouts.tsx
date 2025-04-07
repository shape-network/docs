import { Link } from '@components/ui/link';
import { paths } from '@paths';
import { Callout } from 'nextra/components';

export const StackCallout = () => {
  return (
    <Callout type="info">
      <Link href={paths.stack}>Mint your Stack</Link>.
    </Callout>
  );
};

export const AddToStackCallout = () => {
  return (
    <Callout type="info">
      Do you have a project you&apos;d like to make part of the Stack? <br />
      Reach out on <Link href={paths.twitter}>Twitter/X</Link> or in{' '}
      <Link href={paths.discord}>Discord</Link> to let us know.
    </Callout>
  );
};

export const GasbackCallout = () => {
  return (
    <Callout type="info">
      Learn more about how this works in{' '}
      <Link href={paths.gasback}>Gasback</Link>.
    </Callout>
  );
};

export const NetworkInformationCallout = () => {
  return (
    <Callout type="info">
      For production systems or high throughput testing, we recommend using a
      node from <Link href={paths.alchemyNode}>Alchemy</Link>, one of our node
      providers.
    </Callout>
  );
};

export const OtomsCallout = () => {
  return (
    <Callout type="info">
      We&apos;ve included the three main structs used for mining otoms. Check
      out `IOtoms.sol` and `IOtomsDatabase.sol` for more info.
    </Callout>
  );
};
