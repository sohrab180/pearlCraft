/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, User, LogOut } from 'lucide-react';

export default function Header() {
  const [isOfferVisible, setIsOfferVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authData =
        localStorage.getItem('authData') || sessionStorage.getItem('authData');
      setIsLoggedIn(!!authData);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authData');
    sessionStorage.removeItem('authData');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <>
      {isOfferVisible && (
        <div className="bg-red-600 text-white text-center py-2 px-4 relative">
          <span>🎉 Limited Time Offer: Get 20% Off on All Pearl Craft Jewelry!</span>
          <button className="ml-4 bg-white text-red-600 px-3 py-1 rounded text-sm">
            Shop Now
          </button>
          <button
            className="absolute right-4 top-2 text-white text-lg"
            onClick={() => setIsOfferVisible(false)}>
            ×
          </button>
        </div>
      )}

      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <Link href="/" className="flex items-center space-x-2">
              <img src="/sealogo.png" alt="logo" className="h-8 w-auto" />
              <span className="font-bold text-lg text-gray-700">Pearl Craft</span>
            </Link>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 focus:outline-none">
                ☰
              </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 items-center">
              <li>
                <Link href="/" className="hover:text-red-500 text-black">
                  Home
                </Link>
              </li>

              <li className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 text-black hover:text-red-500"
                >
                  Collections{' '}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {showDropdown && (
                  <ul className="absolute mt-2 bg-white border rounded shadow text-sm">
                    <li>
                      <Link
                        href="/collection"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Jewelry
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/collection/decor"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Decor
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/collection/art"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Art
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link href="/blogs" className="hover:text-red-500 text-black">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-500 text-black">
                  Contact
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      <User size={16} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm bg-gray-200 px-3 py-1 rounded hover:bg-red-500 hover:text-white"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/signup"
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-2 space-y-2">
              <Link href="/" className="block text-gray-700">
                Home
              </Link>
              <button
                className="block text-gray-700"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Collections ⌄
              </button>
              {showDropdown && (
                <div className="ml-4 space-y-1">
                  <Link href="/collection" className="block text-gray-500">
                    Jewelry
                  </Link>
                  <Link href="/collection/decor" className="block text-gray-500">
                    Decor
                  </Link>
                  <Link href="/collection/art" className="block text-gray-500">
                    Art
                  </Link>
                </div>
              )}
              <Link href="/blogs" className="block text-gray-700">
                Blogs
              </Link>
              <Link href="/contact" className="block text-gray-700">
                Contact
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-red-500"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/signup" className="block text-red-600">
                    Sign Up
                  </Link>
                  <Link href="/login" className="block text-gray-600">
                    Login
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
