import React, { useState, useEffect } from "react";

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1680561218941-a14f10300c42?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1689774156286-0160d3f9c700?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://img.magnific.com/free-photo/variety-vegetables-isolated-blue-table_114579-19958.jpg",
    },
    {
      url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzfkg2qjaLAU-W73UI5BzL0dz-3BR720gerAHSU5RZwC0zKpSMkblOlCp&s=10",
    },
  ];

  const cards = [
    {
      icon: "🥗",
      Heading: "Freshness First",
      para: "We use only the freshest ingredients, sourced daily from trusted local vendors.",
    },
    {
      icon: "⏰",
      Heading: "Fast & Reliable",
      para: "We ensure your breakfast arrives hot and on time — every single day.",
    },
    {
      icon: "😊",
      Heading: "Customer Happiness",
      para: "Your satisfaction is our biggest reward. We're here to make your mornings better.",
    },
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // Change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 2000);

    return () => clearInterval(interval);
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

    const element = document.getElementById("about-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div id="about-section" className="min-w-full overflow-hidden">
      {/* Hero Section with Dynamic Background */}
      <div className="relative min-w-full min-h-[60vh] max-h-full border-b-4 overflow-hidden">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: currentImageIndex === index ? 1 : 0,
              }}
            />
          ))}
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-w-full min-h-[60vh] max-h-full grid place-content-center">
          <div
            className="text-center text-white px-4"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              opacity: isVisible ? 1 : 0,
              transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
            }}
          >
            <h1 className="text-3xl md:text-5xl font-bold  mb-3 drop-shadow-lg">
              About Us <span className="text-4xl md:text-6xl ">🍳</span>
            </h1>
            <p className="text-lg md:text-xl drop-shadow-lg">
              Serving happiness, one breakfast at a time.
            </p>

            {/* Image Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index
                      ? "w-8 bg-red-500 shadow-lg shadow-red-500/50"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container min-w-full min-h-[50vh] max-h-full grid grid-cols-1 items-center sm:grid-cols-2 gap-10 px-4 py-7 bg-amber-50">
        <div
          className="transition-all duration-700 hover:scale-105"
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(-50px)",
            opacity: isVisible ? 1 : 0,
            transition:
              "transform 0.8s ease-out 0.2s, opacity 0.8s ease-out 0.2s",
          }}
        >
          <img
            src={heroImages[currentImageIndex].url}
            alt="Breakfast"
            className="rounded-2xl w-full h-64 md:h-96 object-cover shadow-xl"
          />
        </div>
        <div
          className="sm:mt-0"
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(50px)",
            opacity: isVisible ? 1 : 0,
            transition:
              "transform 0.8s ease-out 0.4s, opacity 0.8s ease-out 0.4s",
          }}
        >
          <h1 className="sm:mb-7 text-3xl md:text-4xl font-bold">
            Our Story <span className="text-3xl">📖</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            Breakfast Booking App was born from a simple idea — mornings should
            be stress-free, flavorful, and full of energy! We're a passionate
            team of food lovers, chefs, and techies who came together to bring
            breakfast to your doorstep — fast, fresh, and warm. Whether you
            crave traditional Indian poha, a classic English breakfast, or a
            protein-packed smoothie bowl, we've got something that'll brighten
            your morning. 🌅
          </p>
        </div>
      </div>

      {/* Mission Content */}
      <div className="px-4 py-8 backdrop-blur-[10px] bg-black/40">
        <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Our Mission & Values 🌟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-2">
          {cards.map((item, idx) => {
            return (
              <div
                key={idx}
                className="animate-card slideInLeft"
                style={{
                  transform: isVisible ? "translateY(0)" : "translateY(50px)",
                  opacity: isVisible ? 1 : 0,
                  transition: `transform 0.8s ease-out ${idx * 0.2}s, opacity 0.8s ease-out ${idx * 0.2}s`,
                }}
              >
                <div className=" bg-white rounded-xl shadow-md p-10 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center flex-col justify-center text-center">
                    <span className="text-5xl mb-3">{item.icon}</span>
                    <h2 className="text-2xl font-semibold leading-10 text-gray-800">
                      {item.Heading}
                    </h2>
                    <p className="text-gray-600 px-2">{item.para}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
