import type {FragmentProductInformation} from 'storefrontapi.generated';
import {ArrowRight, ArrowLeft} from 'lucide-react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, A11y} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CustomizeBlendCard from './CustomizeBlendCard';

export default function CustomizeProteinSection({
  proteins,
}: {
  proteins: Array<{node: FragmentProductInformation}>;
}) {
  return (
    <section className="bg-neutral-200 relative">
      <div className="max-w-xl mx-auto text-center flex flex-col gap-2 mb-5">
        <p className="text-[16px] text-black">Simple & Effective Ingredients</p>
        <h3 className="text-[40px] font-[500]">Customized Protein Powder</h3>
      </div>
      <div className="mx-20 relative">
        <div className="custom-prev-blend w-[40px] h-[40px] flex justify-center items-center absolute left-[-60px] top-1/2 transform -translate-y-1/2 border border-neutral-400 rounded cursor-pointer duration-300">
          <ArrowLeft
            size={20}
            color="#1B1F23"
            className="duration-300 ease-in"
          />
        </div>
        <div className="custom-next-blend w-[40px] h-[40px] flex justify-center items-center absolute right-[-60px] top-1/2 transform -translate-y-1/2 border border-neutral-400 rounded cursor-pointer duration-300">
          <ArrowRight
            size={20}
            color="#1B1F23"
            className="duration-300 ease-in"
          />
        </div>
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.custom-next-blend',
            prevEl: '.custom-prev-blend',
          }}
          className="swimlane"
        >
          {proteins.map((product) => (
            <SwiperSlide key={product.node.id} className="h-full">
              <CustomizeBlendCard product={product.node} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
