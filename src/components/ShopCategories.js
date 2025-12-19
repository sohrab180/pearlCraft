/* eslint-disable @next/next/no-img-element */
'use client';

export default function ShopCategories({ items }) {
  return (
    
    <section className="text-center mt-16 px-4">
        
      <h1 className="text-3xl font-bold text-gray-800">Shop by Categories</h1>
      <p className="text-gray-600 mt-2">
        Explore a variety of categories to find your perfect piece
      </p>

      <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-yellow-500 mx-auto my-4 rounded"></div>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {items.map((category, i) => (
          <div
            key={i}
            className="w-64 bg-white border border-pink-300 rounded-xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer"
          >
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h5 className="text-lg font-semibold text-gray-800 mb-1">{category.title}</h5>
              <p className="text-sm text-pink-600 font-bold">{category.price}</p>
              <button className="mt-4 inline-block bg-pink-600 text-white text-sm px-4 py-1.5 rounded hover:bg-pink-700 transition">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
