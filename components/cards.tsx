import { Cards } from 'nextra/components';
import { paths } from '@paths';
import { FC } from 'react';
import { Card } from '@components/ui/card';

export const ProjectCards: FC = () => {
  return (
    <Cards>
      <Card
        title="OTOM by Kjetil Golid"
        subtitle="Create and experiment with particles called otoms"
        href="/building-on-shape/onchain-compatible/otom"
      />
      <Card title="Moveable Type by DEAFBEEF" href={paths.moveableType} />
    </Cards>
  );
};

export const SuperchainIncentivesCards: FC = () => {
  return (
    <Cards>
      <Card title="RetroPGF" href={paths.retroPGF} subtitle="Rewarding your onchain impact" />
      <Card
        title="Free contract deployment"
        href={paths.deployForFree}
        subtitle="Claim deployment rebates"
      />
      <Card title="Gas sponsorship" href={paths.opConsole} subtitle="For your early users" />
      <Card
        title="Launch support"
        href={paths.opConsole}
        subtitle="Amplified marketing through Superchain channels"
      />
    </Cards>
  );
};
