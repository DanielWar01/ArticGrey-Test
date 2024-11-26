import {Image, Money} from '@shopify/hydrogen';
import {FragmentProductInformation} from 'storefrontapi.generated';
import IconStar from './IconStar';
import {Link} from '@remix-run/react';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';

export default function ProductCard({
  product,
}: {
  product: FragmentProductInformation;
}) {
  const selectedVariant = product.variants.edges[0].node;
  const {open} = useAside();
  const priceSubscribe = {
    ...product.priceRange.minVariantPrice,
    amount: (
      parseFloat(product.priceRange.minVariantPrice.amount) * 0.9
    ).toString(),
  };
  return (
    <div className="product-card h-full overflow-hidden cursor-pointer w-full bg-white rounded-lg relative">
      <div className="rounded-lg overflow-hidden m-8">
        <Image
          data={{
            url: product.images.edges[0]?.node.url,
            altText: product.images.edges[0]?.node.altText,
          }}
          aspectRatio="1/1"
          className="product-image duration-300 ease-in-out"
          sizes="(min-width: 45em) 20vw, 50vw"
        />
      </div>
      <div className="relative mx-3">
        <div className="mt-5 product-info transition-all ease-in-out duration-300">
          <div className="flex gap-1 mb-4">
            {product.tags.map((tag) => (
              <p
                key={tag}
                className="text-xs bg-neutral-200 text-black p-1 rounded"
              >
                <span>●</span> {tag}
              </p>
            ))}
          </div>
          <h3 className="font-bold text-lg text-black">{product.title}</h3>
          <p className="text-sm text-neutral-600">
            {product.description.split('.')[0]}
          </p>
          <div className="flex mt-4 justify-between mb-5">
            <div className="flex ">
              {[1, 2, 3, 4, 5].map((_) => (
                <IconStar key={_} color="text-slate-900" size={14} />
              ))}
            </div>
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
              <button className="text-xs flex cursor-pointer text-white bg-[#1B1F23] p-1 px-2 rounded gap-1 items-center">
                Add <span>●</span>{' '}
                <Money data={product.priceRange.minVariantPrice} />
              </button>
            </AddToCartButton>
          </div>
        </div>
        <div className="product-hover flex flex-col py-3 justify-between w-full px-3 gap-3 bg-white absolute h-full top-[130%] duration-500 ease-in-out transition-all left-0">
          <form action="" className="flex justify-between gap-3 w-full">
            <div className="flex gap-2 items-start bg-neutral-200 border border-neutral-300 rounded-md flex-1 p-2">
              <input
                type="radio"
                name="purchase-type"
                value={product.priceRange.minVariantPrice.amount}
              />
              <div className="text-xs">
                <span>One-Time Purchase</span>
                <Money
                  className="font-bold"
                  data={product.priceRange.minVariantPrice}
                />
              </div>
            </div>
            <div className="flex gap-2 items-start bg-neutral-200 border border-neutral-300 rounded-md flex-1 p-2">
              <input
                type="radio"
                name="purchase-type"
                value={
                  parseFloat(product.priceRange.minVariantPrice.amount) * 0.9
                }
              />
              <div className="text-xs">
                <span>Subscribe & Save</span>
                <div className="flex font-bold gap-1">
                  <Money data={priceSubscribe} />
                  <span className="text-[10px] text-red-900">Save 10%</span>
                </div>
              </div>
            </div>
          </form>
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
            <button className="flex cursor-pointer w-full text-white font-bold bg-neutral-900 p-3 rounded-lg justify-center items-center">
              Add To Cart - <Money data={product.priceRange.minVariantPrice} />
            </button>
          </AddToCartButton>
          <Link
            to={`/products/${product.handle}`}
            className="btn-product-full text-xs text-center text-neutral-600"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </div>
  );
}
