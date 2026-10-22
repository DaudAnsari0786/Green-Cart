import { Link } from "react-router-dom";

const ItemDetails = (props) => {
  // Sample product data - replace with your actual data
  const item = {
    id: 1,
    name: "Organic Avocado Bundle",
    price: 12.99,
    originalPrice: 15.99,
    description:
      "Fresh, organic avocados sourced directly from sustainable farms. Rich in healthy fats and nutrients.",
    category: "Fresh Produce",
    unit: "500g",
    stock: 45,
    rating: 4.8,
    reviews: 234,
    image: "https://via.placeholder.com/400x400",
    badge: "Organic",
    isOrganic: true,
    isEcoFriendly: true,
    delivery: "Free delivery on orders above ₹50",
    seller: "GreenHarvest Farms",
    nutrients: ["Vitamin K", "Vitamin C", "Potassium", "Folate"],
    origin: "India",
    harvestDate: "2026-07-15",
  };

  // Smooth scroll to top on any navigation click
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-green-600 mb-4 flex items-center gap-2">
          <Link to={`/home`}>Home</Link>
          <span>›</span>
          <Link to={`/products`}>Products</Link>
          <span>›</span>
          <span className="text-gray-600">{item.category}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Left Column - Product Images */}
            <div className="space-y-4">
              <div className="relative bg-green-50 rounded-xl p-4 flex items-center justify-center">
                {item.badge && (
                  <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                    {item.badge}
                  </span>
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-auto max-h-80 object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((thumb) => (
                  <div
                    key={thumb}
                    className="bg-gray-50 rounded-lg p-2 cursor-pointer border-2 border-transparent hover:border-green-500 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={`₹{item.name} view ₹{thumb}`}
                      className="w-full h-16 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-5">
              {/* Category & Unit */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {item.unit}
                </span>
                {item.isOrganic && (
                  <span className="bg-emerald-100 text-emerald-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Organic
                  </span>
                )}
                {item.isEcoFriendly && (
                  <span className="bg-teal-100 text-teal-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    Eco-Friendly
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {item.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-green-600 font-bold">
                    {item.rating}
                  </span>
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(item.rating))}
                    {"☆".repeat(5 - Math.floor(item.rating))}
                  </div>
                </div>
                <span className="text-gray-500 text-sm">
                  ({item.reviews} reviews)
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-green-600 text-sm font-medium">
                  {item.stock} in stock
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-green-700">
                  ₹{item.price}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹{item.originalPrice}
                </span>
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded">
                  Save ₹{(item.originalPrice - item.price).toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Seller & Origin */}
              <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-lg">
                <div>
                  <span className="text-gray-500">Seller</span>
                  <p className="font-medium text-gray-700">{item.seller}</p>
                </div>
                <div>
                  <span className="text-gray-500">Origin</span>
                  <p className="font-medium text-gray-700">{item.origin}</p>
                </div>
                <div>
                  <span className="text-gray-500">Harvest Date</span>
                  <p className="font-medium text-gray-700">
                    {item.harvestDate}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Delivery</span>
                  <p className="font-medium text-green-600 text-xs">
                    {item.delivery}
                  </p>
                </div>
              </div>

              {/* Nutrients */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Nutritional Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.nutrients.map((nutrient, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full border border-green-200"
                    >
                      {nutrient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity & Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold">
                      −
                    </button>
                    <input
                      type="text"
                      className="w-12 text-center py-1.5 border-x border-gray-300 text-sm focus:outline-none"
                      defaultValue="1"
                    />
                    <button className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold">
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    Available: {item.stock} units
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/Cart`}
                    onClick={scrollToTop}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    Add to Cart
                  </Link>
                  <button className="flex-1 bg-white hover:bg-gray-50 text-green-700 font-semibold px-6 py-3 rounded-lg border-2 border-green-600 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    Wishlist
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Eligible for free delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-green-100 px-6 md:px-8 py-6">
            <div className="flex gap-8 border-b border-gray-200">
              <button className="pb-3 text-sm font-semibold text-green-700 border-b-2 border-green-600">
                Description
              </button>
              <button className="pb-3 text-sm text-gray-500 hover:text-gray-700">
                Reviews (234)
              </button>
              <button className="pb-3 text-sm text-gray-500 hover:text-gray-700">
                Shipping
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-600 leading-relaxed">
              <p>{item.description}</p>
              <p className="mt-2">
                Our avocados are hand-picked at peak ripeness and delivered
                fresh to your doorstep. Sourced from certified organic farms in
                India, these avocados are packed with essential nutrients and
                healthy monounsaturated fats.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl p-4 border border-green-100 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-700 mt-2 text-sm">
                  Organic Product {item}
                </h3>
                <p className="text-green-700 font-bold">₹9.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};;

export default ItemDetails;
