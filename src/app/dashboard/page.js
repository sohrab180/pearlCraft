'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, IdCard, BadgeCheck, ToggleLeft, Home,Globe,Map, ShoppingCart, Edit3, LogOut, Package,MapPin,MapPinned} from 'lucide-react';
 import Swal from 'sweetalert2';
export default function Dashboard() {
  const router = useRouter();
  const [authData, setAuthData] = useState(null);
  const [address, setAddress] = useState({
    houseNo: '',
    landmark: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);

useEffect(() => {
  const savedData = localStorage.getItem('authData') || sessionStorage.getItem('authData');
  if (!savedData) {
    router.push('/login');
    return;
  }

  const parsedData = JSON.parse(savedData);
  setAuthData(parsedData);

 const fetchAddress = async () => {
  try {
    const res = await fetch(`https://api.mypearlcraft.com/api/v20/address/${parsedData.user.id}`, {
      headers: { Authorization: `Bearer ${parsedData.token}` },
    });
    const data = await res.json();

    if (res.ok && Array.isArray(data) && data.length > 0) {
      const fetchedAddress = data[0]; // take the first address
      setAddress(fetchedAddress);

      const updatedData = { ...parsedData, user: { ...parsedData.user, address: fetchedAddress } };
      localStorage.setItem('authData', JSON.stringify(updatedData));
      setAuthData(updatedData);
    }
  } catch (err) {
    console.error('Failed to fetch address:', err);
  }
};

  fetchAddress();
}, [router]);




const handleSaveAddress = async () => {
  try {
    const payload = {
      user: authData.user.id, // user ID sent automatically
      houseNo: address.houseNo,
      landmark: address.landmark,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
    };

    // If address already exists, use PUT; otherwise use POST
    const url = address._id
      ? `https://api.mypearlcraft.com/api/v20/address/${address._id}`
      : 'https://api.mypearlcraft.com/api/v20/address';

    const method = address._id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      const updatedAddress = { ...payload, _id: address._id || data._id };
      setAddress(updatedAddress);

      const updatedData = { ...authData, user: { ...authData.user, address: updatedAddress } };
      localStorage.setItem('authData', JSON.stringify(updatedData));
      setAuthData(updatedData);
      setIsEditingAddress(false);

      Swal.fire({
        icon: 'success',
        title: 'Address Saved',
        text: 'Your address has been saved successfully!',
        confirmButtonColor: '#e63946',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: data.message || 'Failed to save address.',
        confirmButtonColor: '#e63946',
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while saving your address.',
      confirmButtonColor: '#e63946',
    });
  }
};


  const handleLogout = () => {
    localStorage.removeItem('authData');
    sessionStorage.removeItem('authData');
    router.push('/login');
  };

  if (!authData) return <p className="text-center mt-10">Loading Dashboard...</p>;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#FFECE2] text-black flex flex-col items-center py-8">
        <img
          src="/sealogo.png"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-white mb-4"
        />
        <h2 className="text-xl font-bold mb-8">
          {authData.user.firstName} {authData.user.lastName}
        </h2>

        <nav className="w-full px-4 space-y-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg bg-transparent hover:bg-red-500 hover:text-white text-black transition"
          >
            <Home size={18} /> Dashboard
          </button>
          <button
            onClick={() => router.push('/collection')}
            className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg bg-transparent hover:bg-red-500 hover:text-white text-black transition"
          >
            <ShoppingCart size={18} /> Collection 
          </button>
           <button
            onClick={() => router.push('/cart')}
            className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg bg-transparent hover:bg-red-500 hover:text-white text-black transition"
          >
            <ShoppingCart size={18} />  Cart
          </button>
          <button
            onClick={() => setIsEditingAddress(true)}
            className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg bg-transparent hover:bg-red-500 hover:text-white text-black transition"
          >
            <Edit3 size={18} /> {authData.user.address ? 'Edit Address' : 'Add Address'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg bg-transparent hover:bg-red-700 hover:text-white text-black transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#FFF8F3]">
        <h1 className="text-3xl font-bold mb-6 text-red-700">User Dashboard</h1>

        {/* User Information */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="space-y-2 text-gray-700">
            <p><IdCard className="inline mr-2 h-5 w-5" /> <strong>ID:</strong> {authData.user.id}</p>
            <p><User className="inline mr-2 h-5 w-5" /> <strong>Name:</strong> {authData.user.firstName} {authData.user.lastName}</p>
            <p><Mail className="inline mr-2 h-5 w-5" /> <strong>Email:</strong> {authData.user.email}</p>
            <p><BadgeCheck className="inline mr-2 h-5 w-5" /> <strong>Role:</strong> {authData.user.role}</p>
            <p><ToggleLeft className="inline mr-2 h-5 w-5" /> <strong>Status:</strong> {authData.user.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>

       {/* Address Section */}
{isEditingAddress ? (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">
      {authData.user.address ? 'Edit Address' : 'Add Address'}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {['houseNo', 'landmark', 'city', 'state', 'zip', 'country'].map((field) => (
        <input
          key={field}
          type="text"
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={address[field] || ''}
          onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
      ))}
    </div>
    <div className="flex gap-3 mt-4">
      <button
        onClick={handleSaveAddress}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Save Address
      </button>
      <button
        onClick={() => setIsEditingAddress(false)}
        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  </div>
) : (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
    {authData.user.address ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-red-500" />
          <p><strong>House No:</strong> {authData.user.address.houseNo}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-500" />
          <p><strong>Landmark:</strong> {authData.user.address.landmark}</p>
        </div>
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-red-500" />
          <p><strong>City:</strong> {authData.user.address.city}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPinned className="h-5 w-5 text-red-500" />
          <p><strong>State:</strong> {authData.user.address.state}</p>
        </div>
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-red-500" />
          <p><strong>ZIP:</strong> {authData.user.address.zip}</p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-red-500" />
          <p><strong>Country:</strong> {authData.user.address.country}</p>
        </div>
      </div>
    ) : (
      <p className="text-gray-500">No address saved yet.</p>
    )}
    <div className="mt-4 text-right">
      <button
        onClick={() => setIsEditingAddress(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        {authData.user.address ? 'Edit Address' : 'Add Address'}
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
