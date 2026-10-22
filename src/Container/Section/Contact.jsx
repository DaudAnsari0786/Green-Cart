import { useState, useEffect, useRef } from "react";
import {
  Send,
  Phone,
  Mail,
  User,
  MapPin,
  MessageSquare,
  AtSign,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    const form = e.target.closest("form");
    const inputs = form.querySelectorAll("input, textarea");
    let hasEmpty = false;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        hasEmpty = true;
        input.style.borderColor = "#ef4444";
        setTimeout(() => {
          input.style.animation = "";
          input.style.borderColor = "";
        }, 500);
      }
    });

    if (hasEmpty) {
      alert("Please fill all the details.............");
    } else {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: " +91 ",
        message: "",
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 py-20 overflow-hidden"
    >
    
      <div className="relative container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl font-bold text-white mb-4"
            style={{
              transform: `translateY(${isVisible ? 0 : -50}px)`,
              opacity: isVisible ? 1 : 0,
              transition: "all 0.8s ease-out",
            }}
          >
            Contact Us
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{
              transform: `translateY(${isVisible ? 0 : -30}px)`,
              opacity: isVisible ? 1 : 0,
              transition: "all 0.8s ease-out 0.2s",
            }}
          >
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="max-w-2xl mx-auto mb-3 bg-green-500/20 border border-green-400 text-green-300 px-4 py-3 rounded-xl backdrop-blur-sm">
            <span className="block sm:inline">
              ✓ Message sent successfully!
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap flex-col gap-6 justify-center items-center">
            {/* Name Fields */}
            <div
              className="flex justify-center flex-col sm:flex-row gap-6 w-full max-w-2xl"
              style={{
                transform: `translateX(${isVisible ? 0 : -100}px)`,
                opacity: isVisible ? 1 : 0,
                transition: "all 0.8s ease-out 0.4s",
              }}
            >
              <div className="relative flex-1 group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full border-2 border-white/10 bg-white/5 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                  required
                />
              </div>
              <div className="relative flex-1 group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full border-2 border-white/10 bg-white/5 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div
              className="flex justify-center flex-col sm:flex-row gap-6 w-full max-w-2xl"
              style={{
                transform: `translateX(${isVisible ? 0 : 100}px)`,
                opacity: isVisible ? 1 : 0,
                transition: "all 0.8s ease-out 0.6s",
              }}
            >
              <div className="relative flex-1 group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border-2 border-white/10 bg-white/5 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                  required
                />
              </div>
              <div className="relative flex-1 group">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors"
                  size={20} 
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border-2 border-white/10 bg-white/5 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required maxLength={13} minLength={10} 
                />
              </div>
            </div>

            {/* Message and Button */}
            <div
              className="flex justify-center flex-col gap-4 w-full max-w-2xl"
              style={{
                transform: `translateY(${isVisible ? 0 : 50}px)`,
                opacity: isVisible ? 1 : 0,
                transition: "all 0.8s ease-out 0.8s",
              }}
            >
              <div className="relative group">
                <MessageSquare
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-green-400 transition-colors"
                  size={20}
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={500}
                  cols={35}
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full border-2 border-white/10 bg-white/5 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="group relative w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Send
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                  Send Message
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </div>
          </div>
        </form>
      </div>

    
    </div>
  );
};

export default Contact;
