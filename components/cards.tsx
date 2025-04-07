import { Cards } from 'nextra/components';
import { paths } from '@paths';
import Link from 'next/link';
import { FC } from 'react';

type CustomCardProps = {
  title: string;
  href: string;
  subtitle?: string;
};

const CustomCard: FC<CustomCardProps> = ({ title, href, subtitle }) => {
  return (
    <div className="border border-gray-200 rounded p-4 bg-gray-100">
      <Link href={href} className="size-full flex flex-col items-start">
        <span className="font-semibold">{title}</span>
        {subtitle && <span className="text-gray-500 text-sm">{subtitle}</span>}
      </Link>
    </div>
  );
};

export const ProjectCards = () => {
  return (
    <Cards>
      <CustomCard
        title="OTOM by Kjetil Golid"
        subtitle="Create and experiment with particles called otoms"
        href="/building-on-shape/onchain-compatible/otom"
      />
      <CustomCard title="Moveable Type by DEAFBEEF" href={paths.moveableType} />
    </Cards>
  );
};

export const SuperchainIncentivesCards = () => {
  return (
    <Cards>
      <CustomCard
        title="RetroPGF"
        href={paths.retroPGF}
        subtitle="Rewarding your onchain impact"
      />
      <CustomCard
        title="Free contract deployment"
        href={paths.deployForFree}
        subtitle="Claim deployment rebates"
      />
      <CustomCard
        title="Gas sponsorship"
        href={paths.opConsole}
        subtitle="For your early users"
      />
      <CustomCard
        title="Launch support"
        href={paths.opConsole}
        subtitle="Amplified marketing through Superchain channels"
      />
    </Cards>
  );
};
