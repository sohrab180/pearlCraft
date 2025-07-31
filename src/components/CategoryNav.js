export default function CategoryNav() {
  return (
    <div className="flex justify-center py-4 bg-gray-100">
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li><a href="/necklaces">Necklaces</a></li>
        <li><a href="/bracelets">Bracelets</a></li>
        <li><a href="/earrings">Earrings</a></li>
        <li><a href="/rings">Rings</a></li>
        <li><a href="/pendants">Pendants</a></li>
      </ul>
    </div>
  );
}
