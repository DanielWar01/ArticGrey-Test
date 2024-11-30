import type {FragmentProductInformation} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';
export default function CustomizeBlendCard({
  product,
}: {
  product: FragmentProductInformation;
}) {
  return (
    <div className="w-full flex items-center border-2 border-neutral-300 rounded-xl ">
      <div className="flex-1">
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
      <div className="flex-2 w-full h-full border-l-2 border-l-neutral-300 text-center">
        <div className="bg-[#1b1f23] p-10 w-full flex flex-col gap-5 justify-between rounded-tr-xl">
          <h4 className="text-2xl font-[500] text-white">The Blend</h4>
          <div className="flex gap-5 justify-center">
            {product.variants.edges.map((variant, index) =>
              index % 3 === 0 ? (
                <div key={variant.node.id} className="flex gap-4 items-center">
                  <img src="/icons/health/icon-2.svg" alt="" />
                  <p className="text-white">
                    {
                      variant.node.selectedOptions.find(
                        (item) => item.name === 'The Blend',
                      )?.value
                    }
                  </p>
                </div>
              ) : null,
            )}
          </div>
        </div>
        <div className="m-10">
          <h4 className="text-lg font-[500] text-center">Active Ingredients</h4>
          <div className="flex gap-5 my-10">
            {product.variants.edges.slice(0, 3).map((variant) => (
              <div key={variant.node.id}>
                <img src="/icons/health/icon-5.svg" alt="" />
                <h5 className="font-[500] text-[16px]">
                  {
                    variant.node.selectedOptions.find(
                      (item) => item.name === 'Ingredient category',
                    )?.value
                  }
                </h5>
                <p className="text-neutral-600 text-sm">
                  {
                    variant.node.selectedOptions.find(
                      (item) => item.name === 'Detailed ingredients',
                    )?.value
                  }
                </p>
              </div>
            ))}
          </div>
          <button className="cursor-pointer w-full p-3 bg-[#1b1f23] text-white font-bold rounded-lg">
            Customize This Blend
          </button>
        </div>
      </div>
    </div>
  );
}
