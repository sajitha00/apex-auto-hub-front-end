import { Gauge } from "lucide-react";

export default function HotCarCard({ car }) {
  return (
    <div
      className={`rounded-3xl shadow-md overflow-hidden border border-gray-200 transition-all duration-400 hover:scale-105 ${
        car.brand === "Range Rover" ? "bg-orange-100" : "bg-white"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center p-4 sm:p-6">
        {/* Left - Brand & Image */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={car.brandLogoImage}
              alt={car.brand}
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-800">{car.brand}</h3>
              <p className="text-sm text-gray-500">{car.name}</p>
            </div>
          </div>
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-32 lg:h-40 object-cover rounded-xl"
          />
          <div>
            <p className="text-xs text-gray-500">ASKING PRICE</p>
            <p className="text-xl font-bold text-gray-800">
              {car.price.split(" ")[0]}{" "}
              <span className="text-sm text-gray-500">
                {car.price.split(" ")[1]}
              </span>
            </p>
          </div>
        </div>

        {/* Right - Specs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {car.specs.map((spec, index) => (
              <div
                key={index}
                className={`rounded-xl p-3 text-center text-sm font-semibold ${spec.color}`}
              >
                <spec.icon className="w-5 h-5 mx-auto mb-1" />
                {spec.label}
              </div>
            ))}
          </div>
          <div
            className={`rounded-xl p-5 flex items-center gap-3 ${
              car.brand === "Range Rover"
                ? "bg-white border border-gray-200"
                : "bg-green-200"
            }`}
          >
            <Gauge className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-semibold text-gray-800">
              Total Run: {car.totalRun}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
