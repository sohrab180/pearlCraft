// import Image from "next/image";
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CategoryNav from "../components/CategoryNav";
import PopularCollections from "../components/PopularCollections";
import ShopCategories from "../components/ShopCategories";
import NewDesigns from "../components/NewDesigns";
import ConnectUs from "../components/ConnectUs";
import TestimonialSection from "../components/Testimonial";
const mockItems = [
  { image: 'image1.jpg', title: 'Jewelry Item 1', price: '₹199.99' },
    { image: 'images12.png', title: 'Jewelry Item 2', price: '₹299.99' },
    { image: 'images13.png', title: 'Jewelry Item 3', price: '₹399.99' },
    { image: 'image4.jpg', title: 'Jewelry Item 4', price: '₹499.99' },
    { image: 'images5.jpg', title: 'Jewelry Item 5', price: '₹599.99' },
    { image: 'images6.jpg', title: 'Jewelry Item 6', price: '₹699.99' },
    { image: 'images7.jpg', title: 'Jewelry Item 7', price: '₹799.99' },
    { image: 'images8.jpg', title: 'Jewelry Item 8', price: '₹899.99' },
    { image: 'images9.jpg', title: 'Jewelry Item 9', price: '₹999.99' },
    { image: 'images10.jpg', title: 'Jewelry Item 10', price: '₹1099.99' }
];

export default function Home() {
  return (
    <>
      <Hero />
<CategoryNav />
      <PopularCollections items={mockItems} />
      <ShopCategories items={mockItems} />
      <NewDesigns items={mockItems} />
    <TestimonialSection />
      <ConnectUs />
    </>
  );
}
