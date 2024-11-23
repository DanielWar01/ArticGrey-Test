import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Await,
  useLoaderData,
  Link,
  type MetaFunction,
  useFetcher,
  data,
  NavLink,
} from '@remix-run/react';
import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {Image, MediaFile, Money, Video} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {Media} from '@shopify/hydrogen/storefront-api-types';
import VideoComponent from '~/components/VideoComponent';
import ReactPlayer from 'react-player';
import MarqueeBand from '~/components/MarqueeBand';
import SectionBrands from '~/components/SectionBrands';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */

export function loadDeferredData({context}: LoaderFunctionArgs) {
  // Consulta para obtener los productos recomendados
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  // Consulta para obtener el video del metaobject
  const videoMetaobject = context.storefront
    .query(METAOBJECT_VIDEO_URL_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
    videoMetaobject,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <HeaderVideo videoPath={'/hero_video.mp4'} />
      <MarqueeBand />
      <SectionBrands />
      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function HeaderVideo({videoPath}: {videoPath: string}) {
  return (
    <div className="video-section relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 z-0 w-full h-full object-cover"
        controls={false}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline
      >
        <source src={`/videos/${videoPath}`} type="video/mp4" />
        <track kind="subtitles" srcLang="es" label="Subtítulos en Español" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <h2 className="absolute top-[55%] left-5 text-white text-6xl font-bold max-w-4xl md:text-7xl md:top-[70%]">
        Great things never came from comfrot zones.
      </h2>
      <NavLink
        to={'/'}
        className="absolute left-5 bottom-16 p-3 px-10 bg-white text-lg rounded-lg"
      >
        <span className="font-bold">Shop Now</span>
      </NavLink>
    </div>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4 className="">{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;

const METAOBJECT_VIDEO_URL_QUERY = `#graphql
  query {
    metaobject(id: "gid://shopify/Metaobject/105226240310") {
      fields {
        key
        value
        __typename
        reference {
          __typename  # Añadido aquí
          ... on Video {
            id
            __typename  # Añadido aquí
            alt
            preview: sources {
              url
              width
              height
              __typename  # Añadido aquí
            }
            mediaContentType
            sources {
              url
              width
              height
              mimeType
              format
              __typename  # Añadido aquí
            }
          }
        }
      }
    }
  }
` as const;
