'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    // ✅ Add API call here if you want to send data to backend
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Get in Touch</h1>
      {submitted ? (
        <p className="text-green-600 font-semibold">
          Thank you! We `&apos;`ll get back to you soon.
        </p>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
