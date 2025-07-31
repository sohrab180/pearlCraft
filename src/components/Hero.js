/* eslint-disable @next/next/no-img-element */
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const images = [
  {
    image: '/banner3.avif',
    title: 'Timeless Pearl Beauty',
    description:
      'Discover timeless beauty with our handcrafted Pearl Craft Jewelry. From classic designs to contemporary styles, find the perfect piece to treasure forever.',
  },
  {
    image: '/banner2.webp',
    title: 'Elegance in Every Pearl',
    description:
      'Celebrate grace and charm with our finest Pearl Craft Jewelry collection, designed for every special occasion.',
  },
  {
    image: '/banner2.avif',
    title: 'Pure Pearl Perfection',
    description:
      'Handcrafted to perfection, each piece reflects the unmatched elegance of pearls.',
  },
];

export default function Hero() {
  return (
    <section className="w-full">
      <Swiper
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
      >
        {images.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-[70vh] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0  bg-white/40 flex flex-col justify-center items-center text-black text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold">{item.title}</h1>
                <p className="mt-2 text-lg">{item.description}</p>
                <div className="flex gap-4 mt-4">
                  <a
                    href="/collection"
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Shop Now
                  </a>
                  <a
                    href="/collection"
                    className="bg-transparent border  px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Collections
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
