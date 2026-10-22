import React, { useState, useEffect } from "react";
import About from "./About";
import Service from "./Service";
import Contact from "./Contact";
import Blog from "./Blog";
import GreenApple from "/public/assets/Green-apple.png";
import Pineaple from "/public/assets/Pineaple.png";
import ProductCard from "../Section/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [bgColor, setBgColor] = useState("bg-green-950");
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [floatingItems, setFloatingItems] = useState([]);

  // Background color transition effect
  useEffect(() => {
    const colors = [
      "bg-gray-900",
      "bg-emerald-900",
      "bg-green-950",
      "bg-teal-950",
      "bg-lime-950",
    ];

    let colorIndex = 0;
    const duration = 2500;

    const interval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setBgColor(colors[colorIndex]);
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("home-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Mouse move effect for parallax
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate floating particles
  useEffect(() => {
    const items = [
      { emoji: "🍎", x: 10, y: 20, size: 30, delay: 0 },
      { emoji: "🍊", x: 85, y: 15, size: 25, delay: 1 },
      { emoji: "🍇", x: 20, y: 80, size: 20, delay: 2 },
      { emoji: "🍓", x: 75, y: 70, size: 28, delay: 0.5 },
      { emoji: "🥑", x: 50, y: 10, size: 22, delay: 1.5 },
      { emoji: "🍌", x: 90, y: 50, size: 26, delay: 0.8 },
    ];
    setFloatingItems(items);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden ">
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingItems.map((item, index) => (
            <div
              key={index}
              className="absolute animate-float"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: `${item.size}px`,
                animationDelay: `${item.delay}s`,
                opacity: 0.3,
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Background Glow Effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-400/5 rounded-full blur-3xl" />

        <div
          id="home-section"
          className={`min-h-screen sm:max-h-full max-w-full grid grid-cols-1 sm:grid-cols-2 text-white items-center p-5 gap-3.5 transition-all duration-1000 ease-in-out relative ${bgColor}`}
          onMouseMove={handleMouseMove}
          style={{
            transform: isVisible ? "scale(1)" : "scale(0.95)",
            opacity: isVisible ? 1 : 0,
            transition: "transform 1s ease-out, opacity 1s ease-out",
          }}
        >
          {/* Content Section with Animations */}
          <div className="text-center py-4 relative z-10">
            {/* Animated Badge */}
            <div className="inline-block mb-6 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-bounce-slow">
              <span className="text-xs font-semibold tracking-wider uppercase">
                🌿 Fresh & Organic
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
              }}
            >
              We bring the store <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                to your door
              </span>
            </h1>

            <p
              className="my-5 px-3 text-base sm:text-lg text-gray-300 max-w-lg mx-auto"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0,
                transition:
                  "transform 0.8s ease-out 0.2s, opacity 0.8s ease-out 0.2s",
              }}
            >
              Get organic product and sustainably sourced groceries delivery at
              up to 4% off grocery
            </p>

            <div
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0,
                transition:
                  "transform 0.8s ease-out 0.4s, opacity 0.8s ease-out 0.4s",
              }}
            >
              <Link
                to="/products"
                onClick={scrollToTop}
                className="relative inline-block text-black bg-gradient-to-r from-green-400 to-emerald-500 py-3 px-12 rounded-full text-center font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 group overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10">Shop now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>

            {/* Stats Section */}
            <div
              className="flex justify-center gap-8 mt-10"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0,
                transition:
                  "transform 0.8s ease-out 0.6s, opacity 0.8s ease-out 0.6s",
              }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">500+</div>
                <div className="text-sm text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">4.9★</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">10k+</div>
                <div className="text-sm text-gray-400">Customers</div>
              </div>
            </div>
          </div>

          {/* Image Section with Enhanced Effects */}
          <div className="grid place-content-center min-w-fit max-w-full relative z-10">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse" />

            <img
              src={Pineaple}
              alt="Pineapple"
              className="h-80 sm:h-96 lg:h-[450px] transition-all duration-500 relative z-10"
              style={{
                transform: isHovered
                  ? `scale(1.1) rotate(-5deg) translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`
                  : `scale(1) rotate(0deg)`,
                filter: isHovered
                  ? "drop-shadow(0 20px 40px rgba(0,255,0,0.3))"
                  : "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                transition: "transform 0.3s ease-out, filter 0.3s ease-out",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />

            {/* Rotating ring effect */}
            <div
              className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-spin-slow"
              style={{ width: "90%", height: "90%", top: "5%", left: "5%" }}
            />
            <div
              className="absolute inset-0 rounded-full border-2 border-emerald-500/10 animate-spin-slow-reverse"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <About />
        <ProductCard />
        <Blog />
        <Service />
        <Contact />
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
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
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slow-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default Home;
