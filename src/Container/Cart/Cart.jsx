import React, { useState } from "react";
import { Link } from "react-router-dom";
import ItemDetails from "../Cards/ItemDetails";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Tomato",
      price: 29.99,
      image:
        "https://w7.pngwing.com/pngs/689/481/png-transparent-tomato-tomato-natural-foods-food-nightshade-family-thumbnail.png",
    },
    {
      id: 2,
      name: "Apple",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Orange",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  const [quantities, setQuantities] = useState({
    1: 1,
    2: 1,
    3: 1,
  });

  // Fixed: Proper checkout state management
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
  };

  const handleQuantityChange = (id, action) => {
    setQuantities((prev) => ({
      ...prev,
      [id]:
        action === "increment"
          ? (prev[id] || 1) + 1
          : Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const getItemTotal = (item) => {
    const qty = quantities[item.id] || 1;
    return item.price * qty;
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + getItemTotal(item),
    0,
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (quantities[item.id] || 1),
    0,
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fixed: Proper checkout function
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsCheckingOut(true);

    // Get checkout details
    const checkoutItems = cartItems.map((item) => ({
      ...item,
      quantity: quantities[item.id] || 1,
      total: getItemTotal(item),
    }));

    console.log("🛒 Checkout Items:", checkoutItems);
    console.log(`📦 Total Items: ₹{totalItems}`);
    console.log(`💰 Total Price: ₹₹{totalPrice.toFixed(2)}`);

    // Simulate checkout process
    setTimeout(() => {
      const confirmCheckout = window.confirm(
        `🛒 Checkout all ₹{totalItems} items for ₹₹{totalPrice.toFixed(2)}?\n\nClick OK to proceed.`,
      );

      if (confirmCheckout) {
        // Process checkout (API call, payment, etc.)
        console.log("✅ Order placed successfully!");
        alert("🎉 Order placed successfully! Thank you for shopping!");

        // Clear cart after successful checkout
        setCartItems([]);
        setQuantities({});
      }

      setIsCheckingOut(false);
    }, 500);
  };

  // Fixed: Individual item buy function
  const handleBuyItem = (item) => {
    const quantity = quantities[item.id] || 1;
    const total = item.price * quantity;

    const confirmBuy = window.confirm(
      `🛒 Buy ₹{quantity}x ₹{item.name} for ₹₹{total.toFixed(2)}?`,
    );

    if (confirmBuy) {
      console.log(
        `✅ Purchased ₹{quantity}x ₹{item.name} for ₹₹{total.toFixed(2)}`,
      );
      alert(`🎉 Purchased ₹{quantity}x ₹{item.name}!`);

      // Optionally remove the item after purchase
      handleDelete(item.id);
    }
  };

  // Continue shopping handler
  const handleContinueShopping = () => {
    console.log("🛍️ Continuing shopping...");
    // Navigate to shop page or reload products
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen px-4 py-8 backdrop-blur-[10px] bg-black/40">
      

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          🛒 My Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-white text-xl py-12">
            <p className="mb-4">Your cart is empty</p>
            <Link
              to="/products"
              onClick={handleContinueShopping}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden lg:grid grid-cols-5 gap-4 items-center px-4 py-3 bg-white/10 rounded-t-lg text-white font-semibold">
              <div>S.No</div>
              <div className="col-span-1">Product</div>
              <div>Price</div>
              <div>Qty</div>
              <div className="text-center">Actions</div>
            </div>

            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-center px-4 py-4 border-t border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="hidden lg:block text-white/60 font-medium">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="sm:col-span-1 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-black/50 cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={scrollToTop}
                  />
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-gray-400 lg:hidden">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block text-white font-medium">
                  ₹{item.price.toFixed(2)}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrement")}
                    className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantities[item.id] <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-white font-medium w-8 text-center">
                    {quantities[item.id] || 1}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "increment")}
                    className="bg-white/20 hover:bg-white/30 text-white text-xl font-extrabold w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <span className="text-green-400 font-medium ml-2 lg:hidden">
                    ₹{getItemTotal(item).toFixed(2)}
                  </span>
                </div>
                {/* Button which is Buy,About More,Delete */}
                <div className="w-full grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleBuyItem(item)}
                    className="bg-green-600 hover:bg-green-700 text-white text-nowrap py-2 px-2 rounded text-sm transition cursor-pointer"
                    aria-label="Buy item"
                  >
                    Buy
                  </button>
                  <Link
                    to={`/ItemDetails`}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-nowrap py-2 px-2 rounded text-sm transition text-center block"
                    onClick={scrollToTop}
                    aria-label="About More"
                  >
                    About More
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-nowrap py-2 px-2 rounded text-sm transition cursor-pointer"
                    aria-label="Delete item"
                  >
                    Delete
                  </button>
                </div>

                <div className="lg:hidden flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="text-green-400 font-bold">
                    ₹{getItemTotal(item).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

            <div className="mt-6 p-6 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap items-center gap-6 text-white">
                  <div>
                    <span className="text-gray-400">Total Items: </span>
                    <span className="font-bold text-lg">{totalItems}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Products: </span>
                    <span className="font-bold text-lg">
                      {cartItems.length}
                    </span>
                  </div>
                </div>
                <div className="text-white text-xl">
                  <span className="text-gray-400">Total Price: </span>
                  <span className="font-bold text-green-400">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition font-semibold w-full md:w-auto cursor-pointer ₹{
                    isCheckingOut ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isCheckingOut ? "Processing..." : "Checkout All"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
