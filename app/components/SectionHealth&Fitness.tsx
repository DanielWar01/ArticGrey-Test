import HealthFitnessCard from './HealthFitnessCard';

export default function SectionHealthFitness() {
  const cards = [
    {
      icon: 'icon-1',
      title: 'We Make It Easy',
      description:
        'Personalized Solutions & Guidance Mean You Get Just What You Need Nothing More',
    },
    {
      icon: 'icon-2',
      title: 'Clean & Effective',
      description:
        'Proven Ingredients, not Artificial, Crafted By Experts For Optimal Effectiveness',
    },
    {
      icon: 'icon-3',
      title: 'Your Free Dietitian',
      description:
        'Every Gainful Subscriber Gets Free, 1:1 Access Their Own Registered Dietitian.',
    },
    {
      icon: 'icon-4',
      title: 'Made For You',
      description:
        'Performance is Personal. Personalized & Customizable Products For Your Needs, Body & Goals',
    },
  ];
  return (
    <section className="my-5 mx-10">
      <div className="flex flex-col gap-5 w-[420px]">
        <p>🧐 Why Health & Fitness</p>
        <h3 className="text-[40px] font-[500] text-[#1B1F23]">
          Clean Supplements - Made For You
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((element) => (
          <HealthFitnessCard key={element.icon} data={element} />
        ))}
      </div>
    </section>
  );
}
