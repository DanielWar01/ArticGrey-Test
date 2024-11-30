import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import type {GetMediaImageQuery} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export default function PlungeSection({
  image,
}: {
  image: Promise<GetMediaImageQuery>;
}) {
  return (
    <section className="m-10 relative">
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={image}>
          {(response) =>
            response?.node ? (
              <Image
                src={response.node.image.url}
                alt={response.node.image.altText || 'Brand Image'}
                className="object-cover max-w-full max-h-full filter brightness-75"
              />
            ) : (
              <div>No image available</div>
            )
          }
        </Await>
      </Suspense>
      <div className="absolute bg- left-5 w-full top-2/4 translate-y-[-50%] flex flex-col gap-3">
        <h3 className="text-5xl font-[500] text-white">
          The Next Generation is Here
        </h3>
        <p className="text-white text-[16px]">
          Innovative Enginnering. Intelligent Design. Meet The Plunge AII-I.
        </p>
        <div className="flex gap-3">
          <button className="w-48 p-3 rounded-lg cursor-pointer bg-white">
            Take The Plunge
          </button>
          <button className="w-48 p-3 rounded-lg cursor-pointer border border-white bg-transparent text-white">
            Dive Depper
          </button>
        </div>
      </div>
    </section>
  );
}
