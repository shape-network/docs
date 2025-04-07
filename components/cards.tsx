import { Cards } from "nextra/components";
import { paths } from "@paths";
import Link from "next/link";
import { FC } from "react";

type CustomCardProps = {
  title: string;
  href: string;
  subtitle?: string;
};

const CustomCard: FC<CustomCardProps> = ({ title, href, subtitle }) => {
  return (
    <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:bg-red-500">
      <Link href={href} className="flex size-full flex-col items-start">
        <span className="font-semibold">{title}</span>
        {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
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
