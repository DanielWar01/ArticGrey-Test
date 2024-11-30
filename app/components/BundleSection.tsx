import {Link, useNavigate} from '@remix-run/react';
import type {GetCollectionProductsQuery} from 'storefrontapi.generated';
import ProductCard from './ProductCard';
import {ArrowRight, ArrowLeft} from 'lucide-react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, A11y} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {useEffect, useState} from 'react';

export default function BundleSection({
  collection,
}: {
  collection: GetCollectionProductsQuery;
}) {
  const navigate = useNavigate();
  const setParamCollection = (event: any) => {
    const collection_caterory = document.querySelectorAll(
      '.collection_category > button',
    );
    collection_caterory.forEach((category) => {
      category.classList.remove('underline');
      category.classList.remove('underline-offset-9');
    });
    event.target.classList.add('underline');
    event.target.classList.add('underline-offset-9');
    const tag = event.target.dataset.tag;
    navigate(`/?collection=${tag}`, {preventScrollReset: true});
  };
  return (
    <section className="mx-10">
      <div className="flex flex-col gap-2 my-10 lg:flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="text-[16px]">📦 Goals Specific</p>
          <h3 className="text-[40px] font-[500]">Bundles</h3>
        </div>
        <div className="collection_category flex items-center gap-4 text-sm">
          <button
            className="btn-bundle cursor-pointer underline underline-offset-9"
            data-tag="sleep"
            onClick={setParamCollection}
          >
            Sleep
          </button>
          <button
            className="btn-bundle cursor-pointer"
            data-tag="cognitive-function"
            onClick={setParamCollection}
          >
            Cognitive Function
          </button>
          <button
            className="btn-bundle cursor-pointer"
            data-tag="foundational-health"
            onClick={setParamCollection}
          >
            Foundational Health
          </button>
          <button
            className="btn-bundle cursor-pointer"
            data-tag="athletic-performance"
            onClick={setParamCollection}
          >
            Athletic Performance
          </button>
          <button
            className="btn-bundle cursor-pointer"
            data-tag="hormone-support"
            onClick={setParamCollection}
          >
            Hormone Support
          </button>
        </div>
        <div className="relative flex gap-5 items-center">
          <Link
            to="/collections/bundle"
            className="underline btn-view-all lg:m-20"
          >
            View All Bundles
          </Link>
          <div className="flex gap-2">
            <div className="custom-prev-bundle flex justify-center items-center border border-neutral-400 rounded cursor-pointer duration-300">
              <ArrowLeft
                size={20}
                color="#1B1F23"
                className="duration-300 ease-in"
              />
            </div>
            <div className="custom-next-bundle flex justify-center items-center border border-neutral-400 rounded cursor-pointer duration-300">
              <ArrowRight
                size={20}
                color="#1B1F23"
                className="duration-300 ease-in"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:px-12 relative">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={{
            nextEl: '.custom-next-bundle',
            prevEl: '.custom-prev-bundle',
          }}
          breakpoints={{
            360: {slidesPerView: 1, spaceBetween: 10},
            480: {slidesPerView: 1, spaceBetween: 15},
            768: {slidesPerView: 2, spaceBetween: 20},
            1268: {slidesPerView: 4, spaceBetween: 20},
          }}
          className="swimlane"
        >
          {collection?.products.edges.map((product) => (
            <SwiperSlide key={product.node.id} className="h-full">
              <ProductCard product={product.node} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
