import { Handbag, User, TrendingUp } from "lucide-react";
import React from "react";

const Dashboard = () => {
  const cards = [
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      rating: " +12.5%",
      totalrevanue: "Total Revenue",
      price: "₹45,231.89+",
    },
    {
      icon: <Handbag className="w-6 h-6 text-green-600" />,
      rating: " +8.2%",
      totalrevanue: "Total Orders",
      price: "2,345+",
    },
    {
      icon: <User className="w-6 h-6 text-purple-600" />,
      rating: " 3.1%",
      totalrevanue: "Active Users",
      price: "12,890+",
    },
  ];
  return (
    <>
      <div className=" px-4 py-8 backdrop-blur-[10px] bg-black/40">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Dashboard
        </h2>
        <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4">
          {/* Cards */}
          {cards.map((item, idx) => {
            return (
              <div className="product-card animate-card product-card-hover slideInLeft  bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    {item.icon}
                  </div>
                  <span className="text-green-500 text-sm font-semibold">
                    {item.rating}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">
                  {item.totalrevanue}
                </h3>
                <p className="text-2xl font-bold text-gray-900">{item.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
