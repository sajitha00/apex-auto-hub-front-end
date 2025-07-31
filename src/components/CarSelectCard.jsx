import { CheckCircle } from "lucide-react";

export default function CarSelectCard({ car, selected, onSelect }) {
  return (
    <div
      key={car.id}
      onClick={() => onSelect(car)}
      className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
        selected
          ? "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg scale-105"
          : "border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3"
        />
        {selected && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
      </div>
      <h3 className="font-bold text-gray-800 text-sm mb-1">{car.brand}</h3>
      <p className="text-gray-600 text-xs mb-2">{car.name}</p>
      <p className="text-blue-600 font-bold text-sm">
        ${car.basePrice.toLocaleString()}
      </p>
    </div>
  );
}
