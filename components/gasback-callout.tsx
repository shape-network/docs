import { Link } from '@components/ui/link';
import { paths } from '@paths';
import { Callout } from 'nextra/components';

export const GasbackCallout = () => {
  return (
    <Callout type="info">
      Learn more about how this works in{' '}
      <Link href={paths.gasback}>Gasback</Link>.
    </Callout>
  );
};
