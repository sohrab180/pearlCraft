/* eslint-disable @next/next/no-img-element */
'use client';

export default function ConnectUs() {
  const contacts = [
    {
      title: 'Call Us',
      icon: '/call.jpg',
      btn: 'Call Now',
      color: 'bg-blue-500',
      contact: '+919199770786',
      action: () => window.open('tel:+919199770786'),
    },
    {
      title: 'WhatsApp Us',
      icon: '/whatsapp.jpg',
      btn: 'Message Now',
      color: 'bg-green-500',
      contact: '+919199770786',
      action: () =>
        window.open(
          'https://wa.me/919199770786?text=Hi, I would like to know more.',
          '_blank'
        ),
    },
    {
      title: 'Book Appointment',
      icon: '/appointemnt.jpg',
      btn: 'Book Now',
      color: 'bg-cyan-500',
      contact: 'Online Calendar',
      action: () =>
        window.open('https://calendly.com/your-link', '_blank'),
    },
  ];

  return (
    <section className="text-center mt-10">
      <h1 className="text-2xl font-bold">Connect with Us</h1>
      <p className="text-gray-600">
        We are here to assist you. Choose how you&#39;d like to get in touch with us.
      </p>
      <div className="flex flex-wrap justify-center gap-6 px-4 mt-6">
        {contacts.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded text-center p-4 w-64"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-16 h-16 mx-auto mb-3"
            />
            <h5 className="font-semibold">{item.title}</h5>
            <p className="text-gray-600 text-sm mt-1">
              Let’s get in touch and help you better.
            </p>
            <p className="text-sm text-gray-800 font-medium mt-2">
              {item.contact}
            </p>
            <button
              onClick={item.action}
              className={`${item.color} text-white mt-3 px-4 py-1 rounded`}
            >
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
