import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Await,
  useLoaderData,
  Link,
  type MetaFunction,
  NavLink,
} from '@remix-run/react';
import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {Image, Money} from '@shopify/hydrogen';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import MarqueeBand from '~/components/MarqueeBand';
import SectionBrands from '~/components/BrandsSection';
import SectionGoals from '~/components/SectionGoals';
import SectionCollections from '~/components/SectionCollections';
import SectionHealthFitness from '~/components/SectionHealth&Fitness';
import ResultsSection from '~/components/ResultsSection';
import BundleSection from '~/components/BundleSection';
import CustomizeProteinSection from '~/components/CustomizeProteinSection';
import PlungeSection from '~/components/PlungeSection';
import BlogSection from '~/components/BlogSection';
import InstagramSection from '~/components/InstagramSection';

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
async function loadCriticalData({request, context}: LoaderFunctionArgs) {
  const searchParams = new URLSearchParams(new URL(request.url).searchParams);
  const collectionFilter = searchParams.get(`collection`)
    ? `${searchParams.get('collection')}`
    : 'sleep';
  const [
    featuredCollections,
    supplementsCollection,
    bundleCollection,
    proteinBlend,
    blogsInformation,
  ] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront.query(PRODUCTS_INFORMATION_COLLECTION, {
      variables: {handle: 'supplements'},
    }),
    context.storefront.query(PRODUCTS_INFORMATION_COLLECTION, {
      variables: {handle: collectionFilter},
    }),
    context.storefront.query(PROTEIN_BLEND_INFORMATION, {
      variables: {productType: 'Protein'},
    }),
    context.storefront.query(QUERY_BLOGS_INFORMATION),
  ]);

  return {
    featuredCollection: featuredCollections.collections,
    supplementsCollection: supplementsCollection.collectionByHandle,
    bundleCollection: bundleCollection.collectionByHandle,
    proteinBlend: proteinBlend.products,
    blogsInfomration: blogsInformation,
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

  // Consulta para obtener las imagenes del metaobject
  const imageMetaObject = context.storefront
    .query(METAOBJECT_IMAGES_BRANDS)
    .catch((error) => {
      console.error(error);
      return null;
    });

  const imageMetaObjectPlunge = context.storefront
    .query(QUERY_IMAGE_PLUNGE)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
    imageMetaObject,
    imageMetaObjectPlunge,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const productsSuplements = data.supplementsCollection;
  return (
    <div className="home w-full">
      <HeaderVideo videoPath={'/hero_video.mp4'} />
      <MarqueeBand />
      <SectionBrands images={data.imageMetaObject} />
      <SectionGoals collection={data.featuredCollection} />
      <SectionCollections collection={productsSuplements} />
      <SectionHealthFitness />
      <ResultsSection collection={productsSuplements} />
      <BundleSection collection={data.bundleCollection} />
      <CustomizeProteinSection proteins={data.proteinBlend.edges} />
      <PlungeSection image={data.imageMetaObjectPlunge} />
      <BlogSection blogs={data.blogsInfomration} />
      <InstagramSection />
    </div>
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
        Your browser does not support the video tag
      </video>
      <h2 className="absolute top-[55%] left-5 text-white text-6xl font-bold max-w-4xl md:text-7xl md:top-[70%]">
        Great things never came from comfort zones.
      </h2>
      <NavLink
        to={'/'}
        className="btn-shop absolute left-5 bottom-16 p-3 px-10 bg-white text-lg rounded-lg"
      >
        <span className="font-bold">Shop Now</span>
      </NavLink>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    description
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
    collections(first: 5, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

export const RECOMMENDED_PRODUCTS_QUERY = `#graphql
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

const METAOBJECT_IMAGES_BRANDS = `#graphql
  query {
    metaobject(id: "gid://shopify/Metaobject/105680896310") {
      fields {
        key
        value
        references(first: 10) {
          nodes {
            ... on MediaImage {
              image {
                url
                width
                height
                altText
                __typename
              }
            }
          }
        }
      }
    }
  }
` as const;

const PRODUCTS_INFORMATION_COLLECTION = `#graphql
  query getCollectionProducts($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            tags
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  ...ProductVariant
                }
              }
            }
          }
        }
      }
    }
  }
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PROTEIN_BLEND_INFORMATION = `#graphql
  query getProductsByType($productType: String!) {
    products(first: 4, query: $productType) {
      edges {
        node {
          id
          title
          productType
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          tags
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 9) {
            edges {
              node {
                ...ProductVariant
              }
            }
          }
        }
      }
    }
  }
  
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const QUERY_IMAGE_PLUNGE = `#graphql
  query{
    node(id: "gid://shopify/MediaImage/44042093101366") {
      ... on MediaImage {
        image{
  				url
				  width
				  height
				  altText
  			}
      }
    }
  }
` as const;

const QUERY_BLOGS_INFORMATION = `#graphql
  query Articles{
    blog(handle: "news") {
      title
      articles(first: 3) {
        nodes {
          title
          handle
          tags
          publishedAt
          seo {
            title
            description
          }
          image {
            url
  					width
  					height
            altText
          }
          authorV2 {
            name
          }
        }
      }
    }
  }
` as const;
