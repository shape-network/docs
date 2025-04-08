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
      Learn more about how this works in <Link href={paths.gasback}>Gasback</Link>.
    </Callout>
  );
};

export const NetworkInformationCallout = () => {
  return (
    <Callout type="info">
      For production systems or high throughput testing, we recommend using a node from{' '}
      <Link href={paths.alchemyNode}>Alchemy</Link>, one of our node providers.
    </Callout>
  );
};

export const OtomsCallout = () => {
  return (
    <Callout type="info">
      We&apos;ve included the three main structs used for mining otoms. Check out `IOtoms.sol` and
      `IOtomsDatabase.sol` for more info.
    </Callout>
  );
};

export const TransactionFeesCallout = () => {
  return (
    <Callout type="info">
      Shape executes transactions in descending priority order - with higher priority fees taking
      precedence over lower priority fees - so the priority fee allows you to efficiently express
      the urgency of your transaction.
    </Callout>
  );
};

export const RegisterGasbackCallout = () => {
  return (
    <Callout type="info">
      Learn how to{' '}
      <Link href="/tutorials/registering-your-contract-for-gasback">
        register your contracts for Gasback here
      </Link>
      .
    </Callout>
  );
};

export const AlchemyApiCallout = () => {
  return (
    <Callout type="info">
      Visit your <Link href={paths.alchemyDashboard}>Alchemy dashboard</Link> and start building
      now!
    </Callout>
  );
};

export const FaucetsCallout = () => {
  return (
    <Callout type="info">
      You can also <Link href="/tools/bridges">bridge Sepolia ETH</Link> to get started.
    </Callout>
  );
};
