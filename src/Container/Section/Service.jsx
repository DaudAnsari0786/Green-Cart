import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Service = () => {
  const [isVisible, setIsVisible] = useState({
    header: false,
    services: [],
    cta: false,
    trust: false,
  });

  const headerRef = useRef(null);
  const servicesRef = useRef([]);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Fresh Grocery Delivery",
      description:
        "Get fresh fruits, vegetables, and groceries delivered to your doorstep within 2 hours.",
      icon: "🚚",
      color: "bg-green-500",
      delay: "0s",
    },
    {
      id: 2,
      title: "Organic Products",
      description:
        "100% certified organic products sourced directly from sustainable farms.",
      icon: "🌱",
      color: "bg-emerald-500",
      delay: "0.1s",
    },
    {
      id: 3,
      title: "24/7 Customer Support",
      description:
        "Our dedicated team is available round the clock to assist you with any queries.",
      icon: "💬",
      color: "bg-blue-500",
      delay: "0.2s",
    },
    {
      id: 4,
      title: "Free Delivery",
      description:
        "Enjoy free delivery on all orders above ₹50. No hidden charges!",
      icon: "🎁",
      color: "bg-purple-500",
      delay: "0.3s",
    },
    {
      id: 5,
      title: "Quality Guarantee",
      description:
        "We guarantee the highest quality products. Not satisfied? Get a full refund.",
      icon: "✅",
      color: "bg-yellow-500",
      delay: "0.4s",
    },
    {
      id: 6,
      title: "Easy Returns",
      description:
        "Hassle-free returns within 7 days of delivery. Customer satisfaction is our priority.",
      icon: "🔄",
      color: "bg-red-500",
      delay: "0.5s",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    // Observe header
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, header: true }));
        }
      });
    }, observerOptions);

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    // Observe each service card
    const serviceObservers = servicesRef.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => {
                const newServices = [...prev.services];
                newServices[index] = true;
                return { ...prev, services: newServices };
              });
            }
          });
        },
        { ...observerOptions, threshold: 0.1 },
      );

      if (ref) {
        observer.observe(ref);
      }
      return observer;
    });

    // Observe CTA
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, cta: true }));
        }
      });
    }, observerOptions);

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    // Observe Trust Indicators
    const trustObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, trust: true }));
        }
      });
    }, observerOptions);

    if (trustRef.current) {
      trustObserver.observe(trustRef.current);
    }

    return () => {
      headerObserver.disconnect();
      serviceObservers.forEach((observer) => observer.disconnect());
      ctaObserver.disconnect();
      trustObserver.disconnect();
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Animation */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible.header
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-green-600">Services</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We provide top-notch services to make your grocery shopping
            experience seamless, convenient, and enjoyable.
          </p>
          <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full animate-pulse"></div>
        </div>

        {/* Services Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (servicesRef.current[index] = el)}
              className={`cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 p-6 border border-gray-100 hover:border-green-200 hover:transform hover:-translate-y-2 ${
                isVisible.services[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: isVisible.services[index] ? "0s" : "0s",
                animation: isVisible.services[index]
                  ? `fadeInUp 0.6s ease-out ${service.delay} forwards`
                  : "none",
              }}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`${service.color} w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:rotate-6`}
                >
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section with Animation */}
        <div
          ref={ctaRef}
          className={`mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center shadow-xl transition-all duration-1000 transform ${
            isVisible.cta ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 animate-bounce-slow">
            Ready to Experience Our Services?
          </h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their daily
            grocery needs.
          </p>

          <Link
            to="/products"
            onClick={scrollToTop}
            className="inline-block bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Start Shopping Now
          </Link>
        </div>

        {/* Trust Indicators with Animation */}
        <div
          ref={trustRef}
          className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 transform ${
            isVisible.trust
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl font-bold text-green-600 animate-count-up">
              10K+
            </div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl font-bold text-green-600">99%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl font-bold text-green-600">24/7</div>
            <div className="text-sm text-gray-600">Support Available</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl font-bold text-green-600">4.8★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes count-up {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-count-up {
          animation: count-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Service;
