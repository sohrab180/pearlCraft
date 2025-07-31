'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

useEffect(() => {
  const fetchCart = async () => {
    const authData = JSON.parse(localStorage.getItem('authData') || sessionStorage.getItem('authData'));
    if (!authData || !authData.user || !authData.user.id) {
      router.push('/login');
      return;
    }

    try {
      const userId = authData.user.id;
      const res = await fetch(`https://api.mypearlcraft.com/api/v20/cart/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch cart');

      const data = await res.json();
      if (Array.isArray(data.cartProducts)) {
        const updatedProducts = await Promise.all(
          data.cartProducts.map(async (item) => {
            if (!item.image && item.productId) {
              try {
                const prodRes = await fetch(`https://api.mypearlcraft.com/api/v20/product/products/${item.productId}`);
                if (prodRes.ok) {
                  const prodData = await prodRes.json();
                  return { ...item, image: prodData?.image || '' };
                }
              } catch (err) {
                console.error('Failed to fetch product image:', err);
              }
            }
            return item;
          })
        );

        setCart(updatedProducts);
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
       
      } else {
        setCart([]);
        localStorage.setItem('cart', '[]');
        console.warn('cartProducts not found or not an array:', data);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(storedCart);
    }
  };

  fetchCart();
}, [router]);


  const updateServerCart = async (updatedCart) => {
    const authData = JSON.parse(localStorage.getItem('authData') || sessionStorage.getItem('authData'));
    if (authData?.user?.id) {
      const payload = {
        user: authData.user.id,
        cartProducts: updatedCart.map(item => ({
          productId: item.productId?.toString() || item.id?.toString(),
          name: item.name,
          price: item.price,
          discount: item.discount || 0,
          description: item.description,
          quantity: item.quantity,
          image: item.image || ''
        }))
      };

      try {
        await fetch('https://api.mypearlcraft.com/api/v20/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error('Failed to update cart on server:', err);
      }
    }
  };

// const removeFromCart = async (productId) => {
//   try {
//     // Step 1: Remove from backend cart
//     const res = await fetch(`https://api.mypearlcraft.com/api/v20/cart/remove-product/${productId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         // Add auth header if needed
//       }
//     });

//     if (!res.ok) {
//       console.error('Failed to remove product from server cart');
//       return;
//     }

//     // Step 2: Remove from local state
//     const updatedCart = cart.filter(item => item.productId !== productId);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     await updateServerCart(updatedCart); // If your backend requires the new structure again
//   } catch (err) {
//     console.error('Error removing from cart:', err);
//   }
// };

const removeFromCart = async (productId) => {
  try {
    const res = await fetch(`https://api.mypearlcraft.com/api/v20/cart/remove-product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.error('Failed to remove product from server cart');
      return;
    }

    const updatedCart = cart.filter(item => item.productId.toString() !== productId.toString());
    setCart(updatedCart); // ✅ Updates React state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // ✅ Store persistently
    await updateServerCart(updatedCart); // ✅ Update backend if required
  } catch (err) {
    console.error('Error removing from cart:', err);
  }
};

  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty 🛒</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 border-b pb-4">
              <div className="w-28 h-28 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description?.slice(0, 50)}...</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="text-red-600 font-bold">₹{item.price * (item.quantity || 1)}</p>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-xl font-semibold text-red-700">Total: ₹{totalAmount}</h2>
            <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              Proceed to Checkout
            </button>
            <div className="mt-4">
              <Link href="/collection" className="text-red-600 hover:underline">
                ← Browse more products
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
