/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
export default function Footer() {
  return (
    <footer className="bg-[#FFECE2] text-[#5A3E36] pt-10 pb-6 border-t border-[#EBC7B4]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src="/sealogo.png" alt="Pearl Craft Logo" className="w-10 h-10" />
            <h2 className="text-xl font-bold text-[#D17D6A]">Pearl Craft</h2>
          </div>
          <p className="text-sm">
            Handcrafted jewelry made with love and elegance. Perfect for every moment you cherish.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#D17D6A]">Home</a></li>
            <li><a href="/collection" className="hover:text-[#D17D6A]">Collections</a></li>
            <li><a href="/blogs" className="hover:text-[#D17D6A]">Blogs</a></li>
            <li><a href="/contact" className="hover:text-[#D17D6A]">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop by Category</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/necklaces" className="hover:text-[#D17D6A]">Necklaces</a></li>
            <li><a href="/earrings" className="hover:text-[#D17D6A]">Earrings</a></li>
            <li><a href="/bracelets" className="hover:text-[#D17D6A]">Bracelets</a></li>
            <li><a href="/rings" className="hover:text-[#D17D6A]">Rings</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm">Email: <a href="mailto:support@pearlcraft.com" className="hover:text-[#D17D6A]">support@pearlcraft.com</a></p>
          <p className="text-sm mt-1">Phone: +91-9199770786</p>

          <div className="flex space-x-4 mt-4">
            <a href="#"><img src="/instagram.jpg" alt="Instagram" className="w-5 h-5 hover:opacity-70" /></a>
            <a href="#"><img src="/facebook.png" alt="Facebook" className="w-5 h-5 hover:opacity-70" /></a>
            <a href="#"><img src="/pintereset.png" alt="WhatsApp" className="w-5 h-5 hover:opacity-70" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-[#EBC7B4] pt-4 text-center text-sm text-[#9A6E5F]">
        © {new Date().getFullYear()} Pearl Craft. Designed with ❤️ in India.
      </div>
    </footer>
  );
}
