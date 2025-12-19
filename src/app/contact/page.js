<<<<<<< HEAD
// app/contact/page.js
'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Placeholder for form handling logic (e.g., API call)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch min-h-[80vh]">
      {/* Image Side */}
      <div className="w-full h-full relative">
        <Image
          src="/contact.jpg" // Replace with your actual image path
=======
import Image from 'next/image';
import ContactForm from '../../app/contact/ContactForm';

export const metadata = {
  title: "Contact Us - Mypearlcraft",
  description: "Get in touch with Mypearlcraft for support, inquiries, and orders.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch min-h-[80vh]">
      {/* Image Side */}
      <div className="relative w-full h-[400px] md:h-auto">
        <Image
          src="/contact.jpg" // ✅ Ensure this image exists in public/
>>>>>>> c6283a1 (update package.jso)
          alt="Contact Us"
          fill
          className="rounded-xl object-cover shadow-lg"
        />
      </div>

      {/* Form Side */}
<<<<<<< HEAD
      <div className="bg-white p-8 rounded-xl shadow-md flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-pink-700 mb-6">Get in Touch</h1>
        {submitted ? (
          <p className="text-green-600 font-semibold">Thank you! We&#39;ll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
=======
      <ContactForm />
>>>>>>> c6283a1 (update package.jso)
    </div>
  );
}
