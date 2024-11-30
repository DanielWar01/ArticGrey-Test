import {Image} from '@shopify/hydrogen';
import IconStar from './IconStar';
import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import type {MediaImageResponse} from 'storefrontapi.generated';

export default function SectionBrands({
  images,
}: {
  images: Promise<MediaImageResponse>;
}) {
  return (
    <div className="flex bg-neutral-100 flex-col md:flex-row">
      {/* Información del lado izquierdo */}
      <div className="min-w-96 m-5 flex flex-col gap-2 md:border-r pr-20 md:border-r-neutral-300">
        <p className="text-sm p-2 w-48 h-10 border bg-neutral-300 border-black font-bold text-neutral-900 rounded-md flex items-center justify-center">
          #1 Doctor Recommended
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((_) => (
            <IconStar key={_} color="text-yellow-400" size={20} />
          ))}
          <p>12,000+ 5-star Reviews</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={images}>
            {(response) => (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 place-items-center gap-4 w-full mx-10 p-3">
                {response
                  ? response.metaobject.fields
                      .filter((field) => field.key === 'brands_images') // Filtra por el campo correcto
                      .flatMap((field) => field.references.nodes) // Accede a los nodos con imágenes
                      .map((node) => (
                        <div
                          key={node.image.url}
                          className="flex items-center max-w-38 justify-center h-16 bg-white rounded-lg"
                        >
                          <Image
                            src={node.image.url}
                            alt={node.image.altText || 'Brand Image'}
                            className="object-cover max-w-full max-h-full"
                            sizes="(min-width: 45em) 50vw, 100vw"
                          />
                        </div>
                      ))
                  : null}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
