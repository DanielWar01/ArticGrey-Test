import type {GetCollectionProductsQuery} from 'storefrontapi.generated';
import {ArrowRight, ArrowLeft} from 'lucide-react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, A11y, EffectCoverflow} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import {Link} from '@remix-run/react';
import ResultCard from './ResultCard';

export default function ResultsSection({
  collection,
}: {
  collection: GetCollectionProductsQuery;
}) {
  return (
    <section className="bg-neutral-100 px-10">
      <div className="max-w-xl mx-auto my-10 text-center flex flex-col gap-5 mb-5 relative">
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
        <h3 className="text-[40px] font-[500] text-[#1B1F23]">
          Real People. Real Results.
        </h3>
        <Link to="/collections/supplements" className="underline btn-view-all">
          View All
        </Link>
      </div>
      <div className="px-4 md:px-8 lg:px-12 relative">
        <Swiper
          modules={[Navigation, A11y, EffectCoverflow]}
          spaceBetween={40}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          breakpoints={{
            360: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4.5,
            },
          }}
          className="swimlane-2 mx-10"
        >
          {collection?.products.edges.slice(0, 6).map(
            ({node}, index) =>
              node && (
                <SwiperSlide key={node.id} className="h-full w-auto">
                  <ResultCard
                    product={node}
                    videoPath={`/results-${index + 1}.mp4`}
                  />
                </SwiperSlide>
              ),
          )}
        </Swiper>
      </div>
    </section>
  );
}
