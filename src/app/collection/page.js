'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Fallback static products
const staticProducts = [
  {
    productId: '1',
    name: 'Gold Necklace',
    price: 499,
    discount: 0,
    stock: 1,
    image: '/image1.jpg',
    description: 'Elegant gold necklace perfect for special occasions.',
    category: 'Necklace',
    availability: 'Available',
  },
  {
    productId: '2',
    name: 'Diamond Ring',
    price: 999,
    discount: 0,
    stock: 1,
    image: '/image2.jpg',
    description: 'Exquisite diamond ring that radiates brilliance.',
    category: 'Ring',
    availability: 'Available',
  },
  {
    productId: '3',
    name: 'Silver Bracelet',
    price: 199,
    discount: 0,
    stock: 1,
    image: '/image3.jpg',
    description: 'Stylish silver bracelet with a modern design.',
    category: 'Bracelet',
    availability: 'Available',
  },
];

export default function CollectionsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // Fetch products from API with fallback
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('https://api.mypearlcraft.com/api/v20/product/products');
const data = await res.json();


if (Array.isArray(data) && data.length > 0) {
  setProducts(data);
} else {
  setProducts(staticProducts);
}

      } catch (err) {
        console.error('Failed to fetch products:', err);
        setProducts(staticProducts);
      }
    }

    loadProducts();
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // const addToCart = async (product) => {
  //   try {
  //     const authData = JSON.parse(localStorage.getItem('authData') || sessionStorage.getItem('authData'));
  //     if (!authData || !authData.user || !authData.user.id) {
  //       window.location.href = '/login';
  //       return;
  //     }

  //     const userId = authData.user.id;

  //     // Update local cart
  //     const existing = [...cart];
  //     const existingItemIndex = existing.findIndex(item => item.productId === product.productId);

  //     if (existingItemIndex !== -1) {
  //       existing[existingItemIndex].quantity += 1;
  //     } else {
  //       existing.push({ ...product, quantity: 1 });
  //     }

  //     setCart(existing);
  //     localStorage.setItem('cart', JSON.stringify(existing));

  //     // Sync with server
  //     const payload = {
  //       user: userId,
  //       products: existing.map(item => ({
  //         productId: item.productId.toString(),
  //         name: item.name,
  //         price: item.price,
  //         discount: item.discount || 0,
  //         description: item.description,
  //         stock: item.quantity,
  //       })),
  //     };

  //     const res = await fetch('https://api.mypearlcraft.com/api/v20/cart', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!res.ok) throw new Error('Failed to sync cart with server');
  //     console.log('Cart synced:', await res.json());
  //   } catch (err) {
  //     console.error('Error adding to cart:', err);
  //   }
  // };
const addToCart = async (product) => {
  try {
    // Check user login
    const authData = JSON.parse(localStorage.getItem('authData') || sessionStorage.getItem('authData'));
    if (!authData || !authData.user || !authData.user.id) {
      window.location.href = '/login';
      return;
    }
    const userId = authData.user.id;

    // Fetch product details by productId
    const productRes = await fetch(`https://api.mypearlcraft.com/api/v20/product/products/${product._id}`);
    if (!productRes.ok) throw new Error('Failed to fetch product details');
    const productData = await productRes.json();

    // Update local cart
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex(item => item._id === productData._id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({ ...productData, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Prepare payload for cart API
    const payload = {
      user: userId,
      cartProducts: updatedCart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    const res = await fetch('https://api.mypearlcraft.com/api/v20/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Server response:', errorText);
      throw new Error('Failed to sync cart with server');
    }

    console.log('Cart synced:', await res.json());
  } catch (err) {
    console.error('Error adding to cart:', err);
  }
};




  // const removeFromCart = (product) => {
  //   const updatedCart = cart
  //     .map((item) =>
  //       item.productId === product.productId ? { ...item, quantity: item.quantity - 1 } : item
  //     )
  //     .filter((item) => item.quantity > 0);
  //   setCart(updatedCart);
  // };
const removeFromCart = async (product) => {
  try {
    const response = await fetch(`https://api.mypearlcraft.com/api/v20/cart/remove-product/${product._id}`, {
      method: 'DELETE', // or 'POST' depending on API requirement
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if needed, e.g.:
        // 'Authorization': `Bearer ${yourToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to remove product from cart');
    }

    // Update local state after successful API call
    const updatedCart = cart
      .map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    // Optionally show user feedback
  }
};

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const total = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  const hasCart = cart.length > 0;

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-10">Our Pearl Collection</h1>

      <div className={`grid gap-6 ${hasCart ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
        {/* Product Grid */}
        <div className={`${hasCart ? 'lg:col-span-3' : ''} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6`}>
          {products.map((product) => (
            <div key={product.productId} className="flex flex-col bg-white rounded-xl shadow p-4 h-full">
              <div className="w-full h-60 overflow-hidden rounded-lg">
                <Image src={product.image} alt={product.name} width={300} height={240} className="object-cover w-full h-full" />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <h5 className="font-semibold text-gray-800">{product.name}</h5>
                <p className="text-pink-600 font-bold">
                  ₹{product.price - (product.price * (product.discount || 0)) / 100}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">Category: {product.category}</p>
              <p className={`text-xs mt-1 ${product.availability === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                {product.availability}
              </p>
              <p className="text-sm text-gray-600 mt-1">{product.description.slice(0, 40)}...</p>

              <div className="mt-auto flex gap-2 pt-4">
                <button
                  onClick={() => openModal(product)}
                  className="bg-pink-100 text-pink-700 px-3 py-1 rounded hover:bg-pink-200"
                >
                  View
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {hasCart && (
          <div className="bg-pink-50 p-6 rounded-xl shadow-lg sticky top-20 w-full lg:w-[300px]">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-pink-700">Your Cart</h2>
              <p className="text-sm text-gray-600">Review your items before checkout</p>
            </div>

            <ul className="divide-y divide-pink-200 max-h-72 overflow-y-auto pr-2">
              {cart.map((item) => (
                <li key={item.productId} className="py-3 flex items-center justify-between text-sm">
                  <div className="flex-1 pr-2">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="bg-red-100 text-red-700 px-2 rounded hover:bg-red-200"
                      >
                        −
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-green-100 text-green-700 px-2 rounded hover:bg-green-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="font-semibold text-right text-pink-700 w-16">
                    ₹{item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-pink-200 mt-4 pt-4">
              <div className="flex justify-between text-pink-800 font-semibold text-md">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
              <Link
                href="/cart"
                className="block mt-4 bg-pink-600 text-white text-center px-6 py-2 rounded hover:bg-pink-700"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full p-6 rounded-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={500}
              height={400}
              className="w-full h-auto object-cover rounded"
            />
            <h3 className="mt-4 text-xl font-bold text-pink-700">{selectedProduct.name}</h3>
            <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
            <p className="font-bold text-pink-700 mt-2">
              ₹{selectedProduct.price - (selectedProduct.price * (selectedProduct.discount || 0)) / 100}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
