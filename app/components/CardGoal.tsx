import {Image} from '@shopify/hydrogen-react';
import type {CollectionFragment} from 'storefrontapi.generated';
import {Link} from '@remix-run/react';
import {ArrowRight, ArrowUpRight} from 'lucide-react';

export default function CardGoal({data}: {data: CollectionFragment}) {
  const image = data?.image
    ? {
        id: data.image.id,
        url: data.image.url,
        altText: data.image.altText,
        width: data.image.width,
        height: data.image.height,
      }
    : undefined;
  return (
    <div className="">
      <Link
        key={data.id}
        className="collection-link duration-300"
        to={`/collections/${data.handle}`}
      >
        <div className="overflow-hidden rounded-md">
          <Image
            data={image}
            sizes="(min-width: 45em) 50vw, 100vw"
            aspectRatio="4/5"
            className="collection-image duration-300"
          />
        </div>
        <div className="flex justify-between h-28 items-center">
          <div className="w-[90%]">
            <h4 className="font-bold text-lg text-[#1B1F23]">{data.title}</h4>
            <p className="text-lg text-neutral-600">{data.description}</p>
          </div>
          <button className="btn-goal relative w-10 aspect-square rounded-full border border-black cursor-pointer flex justify-center items-center overflow-hidden">
            <div className="icon-1 duration-500">
              <ArrowUpRight size={30} color="black" />
            </div>
            <div className="icon-2 absolute top-2/4 -translate-y-2/4 -left-full duration-500">
              <ArrowRight size={30} color="white" />
            </div>
          </button>
        </div>
      </Link>
    </div>
  );
}
