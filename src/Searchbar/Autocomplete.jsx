import React, { useState, useEffect, useRef, useCallback } from "react";

// Simulated API – replace with your own
const fetchSuggestions = async (query) => {
const mockData = [
  // 🍎 Fresh Fruits
  "Apple",
  "Apricot",
  "Avocado",
  "Banana",
  "Blackberry",
  "Blueberry",
  "Cantaloupe",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Fig",
  "Grape",
  "Grapefruit",
  "Guava",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Lime",
  "Mango",
  "Mulberry",
  "Orange",
  "Papaya",
  "Peach",
  "Pear",
  "Pineapple",
  "Plum",
  "Pomegranate",
  "Raspberry",
  "Strawberry",
  "Watermelon",

  // 🌰 Dry Fruits (Nuts & Dried)
  "Almond",
  "Apricot (Dried)",
  "Cashew",
  "Coconut (Dried)",
  "Date",
  "Fig (Dried)",
  "Hazelnut",
  "Macadamia",
  "Peanut",
  "Pecan",
  "Pistachio",
  "Prune",
  "Raisin",
  "Walnut",

  // 🥬 Vegetables
  "Artichoke",
  "Arugula",
  "Asparagus",
  "Beetroot",
  "Bell Pepper",
  "Bitter Melon",
  "Bok Choy",
  "Broccoli",
  "Brussels Sprouts",
  "Cabbage",
  "Carrot",
  "Cauliflower",
  "Celery",
  "Chard",
  "Chayote",
  "Collard Greens",
  "Corn",
  "Cucumber",
  "Daikon",
  "Eggplant",
  "Endive",
  "Fennel",
  "Garlic",
  "Ginger",
  "Green Bean",
  "Green Onion",
  "Jalapeño",
  "Kale",
  "Kohlrabi",
  "Leek",
  "Lettuce",
  "Mushroom",
  "Mustard Greens",
  "Okra",
  "Onion",
  "Parsnip",
  "Pea",
  "Potato",
  "Pumpkin",
  "Radicchio",
  "Radish",
  "Rutabaga",
  "Shallot",
  "Spinach",
  "Squash",
  "Sweet Potato",
  "Taro",
  "Tomato",
  "Turnip",
  "Watercress",
  "Yam",
  "Zucchini",
];
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockData.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );
};

const Autocomplete = ({
  width = "300px", // 👈 Input width (default 300px)
  height = "44px", // 👈 Input height (default 44px)
  maxHeight = "200px", // 👈 Dropdown max height (default 200px)
  placeholder = "Search...",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!inputValue.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    debounceTimer.current = setTimeout(async () => {
      const results = await fetchSuggestions(inputValue);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setLoading(false);
      setActiveIndex(-1);
    }, 300);

    return () => clearTimeout(debounceTimer.current);
  }, [inputValue]);

  const handleSelect = useCallback((value) => {
    setInputValue(value);
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSelect(suggestions[activeIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getHighlightedText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part,
    );
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          width: width, // 👈 Custom width
          height: height, // 👈 Custom height
          padding: "0 12px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          outline: "none",
          boxSizing: "border-box",
          display: "block",
        }}
        onFocus={() => inputValue.trim() && setIsOpen(suggestions.length > 0)}
      />
      {loading && (
        <div style={{ padding: "8px", color: "#888" }}>Loading...</div>
      )}
      {isOpen && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: `calc(${height} + 4px)`, // 👈 Dynamically positions below input
            left: 0,
            width: width, // 👈 Matches input width
            maxHeight: maxHeight, // 👈 Custom dropdown height
            overflowY: "auto",
            margin: 0,
            padding: 0,
            listStyle: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "white",
            zIndex: 10,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            boxSizing: "border-box",
          }}
        >
          {suggestions.map((item, index) => (
            <li
              key={item}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                padding: "10px 12px",
                cursor: "pointer",
                backgroundColor:
                  index === activeIndex ? "#f0f0f0" : "transparent",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {getHighlightedText(item, inputValue)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
