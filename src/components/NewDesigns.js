/* eslint-disable @next/next/no-img-element */
export default function NewDesigns({ items }) {
  return (
    <section className="text-center mt-10">
         <div className="w-full h-2 bg-gradient-to-r from-pink-400 via-rose-300 to-yellow-300 rounded-t-md mb-6"></div>
      <h1 className="text-2xl font-bold">New Designs</h1>
      <p className="text-gray-600">Discover the latest trends and designs in our collection</p>
     
      <div className="flex flex-wrap justify-center gap-6 mt-6 px-4">
        {items.map((design, i) => (
          <div key={i} className="bg-white shadow p-4 rounded text-center w-60">
            <img src={design.image} alt={design.title} className="w-full h-36 object-cover rounded mb-2" />
            <h5 className="font-semibold">{design.title}</h5>
            <p className="text-red-600 font-bold">{design.price}</p>
            <button className="btn btn-primary btn-sm mt-3 bg-blue-600 text-white px-4 py-1 rounded">View Design</button>
          </div>
        ))}
      </div>
    </section>
  );
}
