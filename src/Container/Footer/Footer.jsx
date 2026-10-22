import React from "react";
import {
  ChevronRight,
  Headset,
  Mail,
  MailIcon,
  MailOpen,
  MapPin,
  Phone,
  ShoppingBasket,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Smooth scroll to top on any navigation click
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <footer className=" bg-[#1e2f23] text-[#d4e0d4] border-t-4 border-[#4caf50]">
        <div className="max-w-7xl mx-auto px-6 pt-12 lg:pt-16">
          {/* <!-- main grid: 4 columns (logo+about, quick links, support, newsletter) --> */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* <!-- 1. Brand  --> */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className=" textstyle text-2xl font-semibold  tracking-tight text-white">
                  {" "}
                  green<span className="text-[#4caf50]">Cart</span>
                </span>
              </div>
              <p className=" liststyle text-sm text-[#b3ccb3] max-w-xs leading-relaxed">
                Fresh organic vegetables delivered from local farms to your
                doorstep.
                <span className=" block mt-1 text-[#8fb38f] ">
                  <i className="fas fa-leaf text-[#4caf50] mr-1"></i> 100%
                  chemical‑free
                </span>
              </p>
              <div className=" ">
                <div className="">
                  <h3 className="text-xl ml-6 textstyle">Follow Us</h3>
                </div>
                <div className="flex gap-3 flex-row pt-1">
                  <a
                    href="https://www.facebook.com/share/1DACFEG6qn/"
                    className="text-[#b3ccb3] hover:text-[#4caf50] transition duration-500 ease-in-out text-xl"
                  >
                    <i className="fa-brands fa-facebook-f text-2xl"></i>
                  </a>

                  <a
                    href="https://www.instagram.com/official_venom_900"
                    className="text-[#b3ccb3] hover:text-[#4caf50] transition duration-500 ease-in-out text-2xl"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="text-[#b3ccb3] hover:text-[#4caf50] transition duration-500 ease-in-out text-2xl"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/@DaudAnsari_900"
                    className="text-[#b3ccb3] hover:text-[#4caf50] transition duration-500 ease-in-out text-2xl"
                  >
                    <i className="fa-brands fa-youtube "></i>
                  </a>
                </div>
              </div>
            </div>

            {/* <!-- 2. Quick links (shop) --> */}
            <div>
              <h3 className="textstyle text-white font-medium text-lg mb-4 flex flex-row items-center tracking-wide border-b w-fit sm:w-full border-[#3f5a3f]  pb-2 ">
                <ShoppingBasket
                  size={23}
                  className="text-[#4caf50] mr-2 text-sm"
                />
                Shop
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" /> Fresh
                    vegetables
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" /> Organic
                    fruits
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" /> Herbs &
                    greens
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" /> Seasonal
                    boxes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" /> Gift
                    baskets
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- 3. Support / info --> */}
            <div>
              <h3 className=" textstyle text-white font-medium text-lg mb-4 tracking-wide border-b w-fit sm:w-full border-[#3f5a3f] pb-2 flex items-center flex-row">
                <Headset size={20} className=" text-[#4caf50] mr-2 text-sm" />{" "}
                Support
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/contact"
                    onClick={scrollToTop}
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" />
                    Contact us
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" />
                    Returns & refunds
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" />
                    Delivery info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" />
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4caf50] transition duration-400 ease-in flex items-center gap-0"
                  >
                    <ChevronRight className="text-green-500 size-5" />
                    Track order
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- 4. Newsletter + contact --> */}
            <div>
              <h3 className="textstyle text-white font-medium text-lg mb-4 tracking-wide border-b w-fit sm:w-full border-[#3f5a3f]  pb-2 flex items-center flex-row">
                <Mail size={20} className=" text-[#4caf50] mr-2 text-sm" />{" "}
                Fresh deals
              </h3>
              <p className="liststyle text-sm text-[#b3ccb3] mb-3">
                Subscribe for weekly veggie updates & 10% off your first order.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-[#2d4030] border border-[#3f5a3f] text-white placeholder-[#8fb38f] text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#4caf50] hover:bg-[#3d9140] text-white font-medium rounded-lg transition text-sm whitespace-nowrap"
                >
                  <i className="fas fa-paper-plane mr-1"></i> Subscribe
                </button>
              </form>
              <div className="mt-5 space-y-2 text-sm text-[#dbe9db]">
                <p className="flex flex-row items-center gap-2">
                  <Phone size={20} /> +91 (9026) 350-956
                </p>
                <p className="flex flex-row items-center gap-2">
                  <MailOpen size={20} />
                  daudansari6472@gmail.com
                </p>
                <p className="flex flex-row items-start gap-2">
                  <MapPin size={20} />
                  Rukmalpur Atrauliya Azamgarh <br />
                  Uttar Pradesh 223223
                </p>
              </div>
            </div>
          </div>

          {/* <!-- bottom bar:copyright --> */}
          <div className="mt-5 pt-5 py-5 lg:pt-7  border-t border-[#3f5a3f] flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[#8fb38f]">
            <div className="text-center sm:text-right">
              <p className="text-s tracking-wide">
                Copyright &copy; 2026
                <span className="text-white font-s"> greenCart </span> - farm
                fresh, always.
                <span className="block sm:inline-block sm:ml-2 text-[#4caf50]/60">
                  <i className="fas fa-seedling"></i> 100% organic All rights
                  reserved.
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};;

export default Footer;
