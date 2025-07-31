'use client';

export default function TestimonialSection() {
  const testimonials = [
    {
      name: 'Anjali Sharma',
      location: 'Delhi, India',
      message:
        'Absolutely stunning! The necklace I bought was even more beautiful in person.',
    },
    {
      name: 'Ravi Mehta',
      location: 'Mumbai, India',
      message:
        'Great customer service and lovely packaging. Will shop again!'
    },
     {
      name: 'Anjali Sharma',
      location: 'Delhi, India',
      message:
        'Absolutely stunning! The necklace I bought was even more beautiful in person.',
    },
    {
      name: 'Sana Ali',
      location: 'Hyderabad, India',
      message:
        'My sister loved the gift! Thank you for making it so special.'
    },
     {
      name: 'Anjali Sharma',
      location: 'Delhi, India',
      message:
        'Absolutely stunning! The necklace I bought was even more beautiful in person.',
    },
  ];

  return (
    <section className="bg-[antiquewhite] py-14 px-6 text-center">
      <h2 className="text-3xl font-bold text-rose-800 mb-2">What Our Customers Say</h2>
      <p className="text-gray-700 mb-10">Kind words from people who love our collections</p>

     <div className="overflow-x-auto scrollbar-hide py-10">
  <div className="flex gap-6 px-6 w-max">
    {testimonials.map((t, i) => {
     
  const heightClass = [ 'h-44', 'h-50', 'h-62', 'h-44' ][i % 4];
      return (
        <div key={i} className={`relative w-72 ${heightClass} flex-shrink-0`}>
          {/* Hanging strip */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-rose-400 rounded-full z-10"></div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-rose-300"></div>

          {/* Card */}
          <div className="mt-10 bg-pink-100/40 backdrop-blur-md border border-rose-200 rounded-xl p-6 shadow-md transition-transform hover:scale-105 h-full overflow-hidden">
            <p className="text-sm text-gray-700 italic mb-4">“{t.message}”</p>
            <h4 className="text-rose-800 font-bold">{t.name}</h4>
            <p className="text-xs text-gray-500">{t.location}</p>
          </div>
        </div>
      );
    })}
  </div>
</div>

    </section>
  );
}
