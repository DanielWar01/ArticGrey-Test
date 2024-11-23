import IconStar from './IconStar';

export default function SectionBrands() {
  return (
    <div className="flex bg-neutral-100">
      <div className="min-w-64 m-5 flex flex-col gap-2 border-r pr-20 border-r-neutral-300">
        <p className="text-sm p-2 w-48 h-10 border bg-neutral-300 border-black font-bold text-neutral-900 rounded-md flex items-center justify-center">
          #1 Doctor Recommended
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <IconStar key={index} color="text-yellow-400" size={20} />
          ))}
          <p className="">12,000+ 5-star Reviews</p>
        </div>
      </div>
    </div>
  );
}
