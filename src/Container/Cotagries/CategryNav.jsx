import React, { useState } from "react";
import { Link } from "react-router-dom";
import DryFruits from "./DryFruits";
import FashionLifeStyle from "./FashionLifeStyle";
import Grocerykitchen from "./Grocerykitchen";
import SnachDrink from "./SnachDrink";
import Vegitable from "./Vegitable";

const AllBrand = () => <div className="text-white">All Products</div>;

const CategryNav = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "All", label: "All", component: AllBrand, path: "/all" },
    {
      id: "dryfruits",
      label: "Dry Fruits", 
      component: DryFruits,
      path: "/dry-fruits",
    }, // fixed path
    {
      id: "fashion",
      label: "Fashion & Lifestyle",
      component: FashionLifeStyle,
      path: "/fashion",
    },
    {
      id: "grocery",
      label: "Grocery & Kitchen",
      component: Grocerykitchen,
      path: "/grocery",
    },
    {
      id: "veg",
      label: "Vegetables",
      component: Vegitable,
      path: "/vegetables",
    },
    {
      id: "snacks",
      label: "Snacks & Drinks",
      component: SnachDrink,
      path: "/snacks",
    },
  ];

  const activeCategoryObj =
    categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <>
      <nav className="bg-transparent text-white sticky top-0 z-100 px-5 py-2">
        <ul className="flex list-none m-0 p-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((cat) => (
            <li key={cat.id} className="py-3 mr-6 flex-shrink-0">
              <Link
                to={cat.path}
                className={`
                  no-underline text-white text-base font-medium px-1 pb-2 
                  border-b-2 border-transparent transition-all duration-200 
                  inline-block cursor-pointer capitalize
                  ${
                    activeCategory === cat.id
                      ? "border-yellow-300 text-yellow-300"
                      : "hover:text-yellow-300 transition-all duration-500 ease-in-out"
                  }
                `}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-5 text-white text-xl font-bold">
        {React.createElement(activeCategoryObj.component)}
      </div>
    </>
  );
};

export default CategryNav;
