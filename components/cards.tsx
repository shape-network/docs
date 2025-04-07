import { Cards } from 'nextra/components';
import { paths } from '@paths';

export const ProjectCards = () => {
  return (
    <Cards>
      <Cards.Card
        title="OTOM by Kjetil Golid"
        href="/building-on-shape/onchain-compatible/otom"
      />
      <Cards.Card title="Moveable Type by DEAFBEEF" href={paths.moveableType} />
    </Cards>
  );
};
