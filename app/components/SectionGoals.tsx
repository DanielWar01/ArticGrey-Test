import {FeaturedCollectionFragment} from 'storefrontapi.generated';
import CardGoal from './CardGoal';

export default function SectionGoals({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  return (
    <section className="w-full">
      <div className="text-center max-w-md mx-auto">
        <h2 className="uppercase text-lg">Comfrotably Uncomfortable</h2>
        <h3 className="text-[40px] font-[500]">Start with your Goals</h3>
        <p className="text-neutral-600 text-lg">
          We cannot become what we want to be by remaining what we are.
        </p>
      </div>
      <div className="mt-10 mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {collection.nodes.map((node) => (
          <CardGoal key={node.id} data={node} />
        ))}
      </div>
    </section>
  );
}
