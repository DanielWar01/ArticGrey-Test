import {Image, Money} from '@shopify/hydrogen';
import type {FragmentProductInformation} from 'storefrontapi.generated';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';

export default function ResultCard({
  product,
  videoPath,
}: {
  product: FragmentProductInformation;
  videoPath: string;
}) {
  const selectedVariant = product.variants.edges[0].node;
  const {open} = useAside();
  return (
    <div className="h-full overflow-hidden cursor-pointer w-full rounded-lg relative">
      <video
        controls={false}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline
        className="rounded-lg"
      >
        <source src={`/videos/${videoPath}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex bg-white mt-3 gap-2 p-2 rounded-lg items-center">
        <Image
          data={{
            url: product.images.edges[0]?.node.url,
            altText: product.images.edges[0]?.node.altText,
          }}
          aspectRatio="1/1"
          className="product-image bg-neutral-200 p-[10px]"
          sizes="(min-width: 2rem) 4vw, 25vw"
          style={{
            width: '70px',
            height: '70px',
            objectFit: 'cover',
          }}
        />
        <div className="flex flex-col gap-2">
          <p>{product.title}</p>
          <Money
            className="font-bold"
            data={product.priceRange.minVariantPrice}
          />
        </div>
        <div className="ml-auto">
          <AddToCartButton
            disabled={!selectedVariant || !selectedVariant.availableForSale}
            onClick={() => {
              open('cart');
            }}
            lines={
              selectedVariant
                ? [
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                      selectedVariant,
                    },
                  ]
                : []
            }
          >
            <button className="cursor-pointer">
              <img src="/icons/results/icon-plus.svg" alt="Add to cart" />
            </button>
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}
