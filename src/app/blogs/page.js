// app/blogs/page.js
'use client';

import Image from 'next/image';

const blogs = [
  {
    id: 1,
    title: 'The Beauty of Pearls in Modern Jewelry',
    excerpt: 'Explore how pearls are making a comeback in contemporary designs with timeless elegance...',
    image: '/banner.png',
    date: 'July 10, 2025'
  },
  {
    id: 2,
    title: 'How to Style Gold Accessories for Daily Wear',
    excerpt: 'Learn tips and tricks for wearing gold jewelry to work, brunch, or an evening party...',
    image: '/banner2.webp',
    date: 'July 8, 2025'
  },
  {
    id: 3,
    title: 'Behind the Craft: Making of Diamond Jewelry',
    excerpt: 'An inside look into the process and craftsmanship behind your favorite diamond pieces...',
    image: '/banner3.avif',
    date: 'July 5, 2025'
  }
];

export default function BlogsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-pink-700 mb-10 text-center">Our Blog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="w-full h-56 relative">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-1">{blog.date}</p>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
              <button className="text-pink-600 hover:underline font-medium text-sm">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
