import { useState } from "react";
import { useSelector } from "react-redux";
import { Car, Wrench, Palette, Settings, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CarSelectCard from "../components/CarSelectCard";
import PartToggleCard from "../components/PartToggleCard";

const CARS = [
  {
    id: 1,
    name: "Range Rover Evoque",
    brand: "Range Rover",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    basePrice: 38700,
  },
  {
    id: 2,
    name: "Nissan GTR R35",
    brand: "Nissan",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    basePrice: 187900,
  },
  {
    id: 3,
    name: "BMW M3",
    brand: "BMW",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    basePrice: 72000,
  },
  {
    id: 4,
    name: "Mercedes AMG GT",
    brand: "Mercedes",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    basePrice: 125000,
  },
];

const COLORS = [
  { name: "Red", value: "red-600", hex: "#dc2626" },
  { name: "Blue", value: "blue-600", hex: "#2563eb" },
  { name: "Green", value: "green-600", hex: "#16a34a" },
  { name: "Black", value: "gray-900", hex: "#111827" },
  { name: "White", value: "gray-100", hex: "#f3f4f6" },
];

const PARTS = [
  { name: "Spoiler", key: "spoiler", price: 299.99, icon: Wrench },
  { name: "Alloy Wheels", key: "wheels", price: 899.99, icon: Car },
  { name: "Sunroof", key: "sunroof", price: 599.99, icon: Settings },
  { name: "Body Kit", key: "bodykit", price: 799.99, icon: Palette },
];

export default function Customize() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [selectedCar, setSelectedCar] = useState(CARS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePartToggle = (key) => {
    setSelectedParts((prev) =>
      prev.includes(key) ? prev.filter((part) => part !== key) : [...prev, key]
    );
  };

  const calculateTotalPrice = () => {
    const partsPrice = selectedParts.reduce((total, key) => {
      const part = PARTS.find((p) => p.key === key);
      return total + (part ? part.price : 0);
    }, 0);
    return selectedCar.basePrice + partsPrice;
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      alert("Please login to save your build!");
      return navigate("/login");
    }

    setLoading(true);
    try {
      const selectedPartsData = selectedParts.map((key) =>
        PARTS.find((p) => p.key === key)
      );

      const buildData = {
        carModel: selectedCar.name,
        color: color.name,
        selectedParts: selectedPartsData.map((p) => p.name),
        totalPrice: calculateTotalPrice(),
      };

      const response = await fetch("http://localhost:5000/api/builds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(buildData),
      });

      if (response.ok) {
        alert("Build saved successfully!");
        navigate("/builds");
      } else {
        const error = await response.json();
        alert(`Failed to save build: ${error.message}`);
      }
    } catch (err) {
      alert("Error saving build");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Customize Your Car
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Create your perfect build with premium parts
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Car Selection */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Car className="w-6 h-6 mr-2 text-blue-600" />
                Choose Your Car
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CARS.map((car) => (
                  <CarSelectCard
                    key={car.id}
                    car={car}
                    selected={selectedCar.id === car.id}
                    onSelect={setSelectedCar}
                  />
                ))}
              </div>
            </div>

            {/* Car Preview (not extracted to keep layout unchanged) */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Palette className="w-6 h-6 mr-2 text-green-600" />
                Car Preview
              </h2>
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    style={{
                      filter:
                        color.value === "gray-100"
                          ? "brightness(1.2) grayscale(0.2)"
                          : color.value === "gray-900"
                          ? "brightness(0.6) grayscale(0.5)"
                          : `hue-rotate(${
                              color.name === "Red"
                                ? "0deg"
                                : color.name === "Blue"
                                ? "240deg"
                                : color.name === "Green"
                                ? "120deg"
                                : "0deg"
                            })`,
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {selectedCar.brand}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {color.name}
                  </div>
                </div>
                <p className="mt-4 text-gray-500 text-sm font-medium">
                  Live Preview
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Parts, Price, Save */}
          <div className="space-y-6">
            {/* Color Picker */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Palette className="w-6 h-6 mr-2 text-purple-600" />
                Choose Color
              </h2>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                      color.value === c.value
                        ? "border-blue-600 ring-4 ring-blue-300 scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400 hover:ring-2 hover:ring-gray-200"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setColor(c)}
                    title={c.name}
                  ></button>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600 font-medium">
                Selected:{" "}
                <span className="text-blue-600 font-semibold">
                  {color.name}
                </span>
              </p>
            </div>

            {/* Parts Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-orange-600" />
                Select Parts
              </h2>
              <div className="space-y-3">
                {PARTS.map((part) => (
                  <PartToggleCard
                    key={part.key}
                    part={part}
                    isSelected={selectedParts.includes(part.key)}
                    onToggle={handlePartToggle}
                  />
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-green-600" />
                Price Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Base Car:</span>
                  <span className="font-bold text-gray-800">
                    ${selectedCar.basePrice.toLocaleString()}
                  </span>
                </div>
                {selectedParts.map((key) => {
                  const part = PARTS.find((p) => p.key === key);
                  return (
                    <div
                      key={key}
                      className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">
                        + {part.name}:
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        ${part.price}
                      </span>
                    </div>
                  );
                })}
                <hr className="my-4 border-gray-200" />
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-2xl">
                    ${calculateTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 text-lg shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Save Build
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
