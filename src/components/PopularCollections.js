/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PopularCollections({ items }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative text-center mt-10 bg-[antiquewhite] py-10 px-4 rounded-md shadow-inner">
      <h1 className="text-3xl font-bold text-rose-800">Popular Collections</h1>
      <p className="text-gray-700">Because your loved one deserves something special</p>
      <div className="w-20 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto my-4 rounded"></div>

      {/* Arrows */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hidden md:block"
      >
        <ChevronLeft className="text-pink-600" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hidden md:block"
      >
        <ChevronRight className="text-pink-600" />
      </button>

      {/* Carousel container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-2 py-4 scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="min-w-[220px] bg-white rounded-xl shadow-lg p-4 text-center flex-shrink-0 transition-transform duration-300 hover:scale-105 border-t-4 border-pink-200"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h5 className="mt-1 text-lg font-semibold text-gray-800">{item.title}</h5>
            <p className="text-pink-600 font-bold text-md">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
