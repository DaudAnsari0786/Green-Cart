import React, { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";

// Image Imports
import img1 from "/assets/Orange.png";
import img2 from "/assets/blackGraps.png";
import img3 from "/assets/Tomato.png";
import img4 from "/assets/Stobarry.png";
import img5 from "/assets/Green-apple.png";
import img6 from "/assets/Mango1.png";
import img7 from "/assets/Bringal.png";
import img8 from "/assets/pineaple.png";
import img9 from "/assets/Shimlamirch.png";
import img10 from "/assets/redMirch.png";
import CategryNav from "../Cotagries/CategryNav";

// Import Category Component

const ProductCard = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Product Data
   const products = [
    {
      id: 1,
      img: img1,
      name: "Orange",
      category: "Fruits",
      para: "Fresh organic oranges from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      img: img2,
      name: "Grapes",
      category: "Fruits",
      para: "Fresh organic grapes from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 95,
    },
    {
      id: 3,
      img: img3,
      name: "Tomato",
      category: "Vegetables",
      para: "Fresh organic tomatoes from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 156,
    },
    {
      id: 4,
      img: img4,
      name: "Strawberry",
      category: "Fruits",
      para: "Fresh organic strawberries from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 210,
    },
    {
      id: 5,
      img: img5,
      name: "Apple",
      category: "Fruits",
      para: "Fresh organic apples from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 342,
    },
    {
      id: 6,
      img: img6,
      name: "Mango",
      category: "Fruits",
      para: "Fresh organic mangoes from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 278,
    },
    {
      id: 7,
      img: img7,
      name: "Brinjal",
      category: "Vegetables",
      para: "Fresh organic brinjals from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 67,
    },
    {
      id: 8,
      img: img8,
      name: "Pineapple",
      category: "Fruits",
      para: "Fresh organic pineapples from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 143,
    },
    {
      id: 9,
      img: img9,
      name: "Capsicum",
      category: "Vegetables",
      para: "Fresh organic capsicums from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 89,
    },
    {
      id: 10,
      img: img10,
      name: "Red Chilli",
      category: "Spices",
      para: "Fresh organic red chillies from local farms, perfect for healthy snacking.",
      price: 4.99,
      rating: 4.5,
      reviews: 56,
    },
  ];

  // Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Add to Cart
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    // You can add toast notification here
    console.log("Added to cart:", product.name);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-20");
        }
      });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Render Stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          size={16}
          className="fill-yellow-400 text-yellow-400 opacity-50"
        />,
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 backdrop-blur-[10px] bg-gradient-to-b from-green-900/90 to-black/90">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className=" text-4xl md:text-5xl font-bold text-white mb-4">
          🛒 Our Fresh Products
          {/* <div className="w-fit h-1 bg-green-400 mx-auto mt-4 rounded-full" /> */}
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover our handpicked selection of fresh, organic fruits and
          vegetables
        </p>
      </div>

      <div className="">
        <CategryNav />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
        {products.map((item) => {
          const isInWishlist = wishlist.includes(item.id);

          return (
            <div
              key={item.id}
              className="product-card bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-5 opacity-0 translate-y-20 transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 group border border-white/10"
              style={{
                transitionDelay: `${(item.id - 1) * 100}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative mb-4">
                <div className="overflow-hidden rounded-lg bg-white/5">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-48 object-contain transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <Heart
                    size={20}
                    className={`transition-colors duration-300 ${
                      isInWishlist ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                  />
                </button>

                {/* Category Badge */}
                <span className="absolute top-2 left-2 bg-green-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="mb-3">
                <h3 className="text-white font-bold text-lg group-hover:text-green-400 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {item.para}
                </p>
              </div>

              {/* Price and Rating */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-green-400 text-xl font-bold">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-gray-400 text-xs">
                    ({item.reviews})
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(item)}
                className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold transform hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* Cart Summary (Optional) */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-bounce-slow">
          <ShoppingCart size={20} />
          <span className="font-semibold">
            {cartItems.length} items in cart
          </span>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
