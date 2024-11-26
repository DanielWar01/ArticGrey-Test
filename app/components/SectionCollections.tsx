import {Link} from '@remix-run/react';
import type {GetCollectionProductsQuery} from 'storefrontapi.generated';
import ProductCard from './ProductCard';
import {ArrowRight, ArrowLeft} from 'lucide-react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, A11y} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SectionCollections({
  collection,
}: {
  collection: GetCollectionProductsQuery;
}) {
  return (
    <section className="bg-neutral-100">
      <div className="w-72 mx-auto text-center flex flex-col gap-5 mb-5 relative">
        {/* Flechas de navegación al lado del texto */}
        <div className="custom-prev flex justify-center items-center absolute left-[-60px] top-1/2 transform -translate-y-1/2 border border-neutral-400 rounded cursor-pointer duration-300">
          <ArrowLeft
            size={20}
            color="#1B1F23"
            className="duration-300 ease-in"
          />
        </div>
        <div className="custom-next flex justify-center items-center absolute right-[-60px] top-1/2 transform -translate-y-1/2 border border-neutral-400 rounded cursor-pointer duration-300">
          <ArrowRight
            size={20}
            color="#1B1F23"
            className="duration-300 ease-in"
          />
        </div>

        <p className="">🌟 Trending</p>
        <h3 className="text-[40px] font-[500] text-slate-900">
          {collection?.title}
        </h3>
        <Link to="/collections/supplements" className="underline btn-view-all">
          View All
        </Link>
      </div>

      <div className="px-4 md:px-8 lg:px-12 relative">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          breakpoints={{
            320: {slidesPerView: 1, spaceBetween: 10},
            480: {slidesPerView: 2, spaceBetween: 15},
            768: {slidesPerView: 3, spaceBetween: 20},
            1024: {slidesPerView: 4, spaceBetween: 20},
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
