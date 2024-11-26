type HealthFitnessCardProps = {
  data: {
    icon: string;
    title: string;
    description: string;
  };
};

export default function HealthFitnessCard({data}: HealthFitnessCardProps) {
  return (
    <div>
      <img src={`/icons/health/${data.icon}.svg`} alt={`${data.title}`} />
      <h4 className="font-bold text-lg">{data.title}</h4>
      <p className="text-neutral-500 text-[16px]">{data.description}</p>
    </div>
  );
}
