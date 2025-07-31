import { useSelector } from "react-redux";
import { Search, Flame } from "lucide-react";

import HotCarCard from "../components/HotCarCard";
import RegularCarItem from "../components/RegularCarItem";

import nissanimg from "../assets/nissan-img.png";
import nissanLogo from "../assets/nissanlogo.png";
import landRoverLogo from "../assets/landrover-loog.png";
import rangeRover2 from "../assets/9001.png";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const hotCollections = [
    {
      id: 1,
      name: " Evoque",
      brand: "Range Rover",
      brandLogo: "LAND-ROVER",
      brandLogoImage: landRoverLogo,
      price: "$38,700 USD",
      specs: [
        { label: "1997 CC", icon: "Zap", color: "bg-orange-200 text-gray-800" },
        {
          label: "246.74 BHP",
          icon: "TrendingUp",
          color: "bg-blue-100 text-gray-800",
        },
        {
          label: "6 Speed",
          icon: "Gauge",
          color: "bg-yellow-100 text-gray-800",
        },
        {
          label: "4 Cylinder",
          icon: "SettingsIcon",
          color: "bg-purple-100 text-gray-800",
        },
      ],
      totalRun: "12,500 Km",
      image: rangeRover2,
    },
    {
      id: 2,
      name: "R35 Nismo",
      brand: "Nissan",
      brandLogo: "NISSAN",
      brandLogoImage: nissanLogo,
      price: "$187,900 USD",
      specs: [
        { label: "3799 CC", icon: "Zap", color: "bg-orange-100 text-gray-800" },
        {
          label: "591.4 BHP",
          icon: "TrendingUp",
          color: "bg-blue-100 text-gray-800",
        },
        {
          label: "6 Speed",
          icon: "Gauge",
          color: "bg-yellow-100 text-gray-800",
        },
        {
          label: "6 Cylinder",
          icon: "SettingsIcon",
          color: "bg-purple-100 text-gray-800",
        },
      ],
      totalRun: "9,254 Km",
      image: nissanimg,
    },
  ];

  const regularCollections = [
    {
      id: 1,
      model: "Honda CR-V 2021",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100&h=60&fit=crop",
      totalRun: "22,409 Km",
      condition: "Great",
      askingPrice: "$30,450",
      buttonColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      model: "Audi A6 2021",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=60&fit=crop",
      totalRun: "18,647 Km",
      condition: "Need Servicing",
      askingPrice: "$54,900",
      buttonColor: "bg-gray-100 text-gray-600",
    },
    {
      id: 3,
      model: "Audi Q3 2019",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=60&fit=crop",
      totalRun: "35,000 Km",
      condition: "Great",
      askingPrice: "$35,695",
      buttonColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 4,
      model: "Mercedes-Benz C-Class 2019",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=60&fit=crop",
      totalRun: "12,520 Km",
      condition: "Excellent",
      askingPrice: "$52,000",
      buttonColor: "bg-gray-100 text-gray-600",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {getGreeting()}, {user?.name || "User"}!
          </h1>
          <p className="text-sm text-gray-500">Welcome back to your garage.</p>
        </div>
        <div className="relative w-1/3 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search here"
            className="pl-10 py-2 pr-4 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Hot Collections */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Flame className="mr-2 text-red-500" /> Hot Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {hotCollections.map((car) => (
            <HotCarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Regular Collections */}
      <section>
        <h2 className="text-xl font-bold mb-4">Regular Collections</h2>

        {/* Desktop Table */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200 hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    CAR MODEL
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    TOTAL RUN
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    CONDITION
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    ASKING PRICE
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {regularCollections.map((car) => (
                  <RegularCarItem key={car.id} car={car} view="desktop" />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {regularCollections.map((car) => (
            <RegularCarItem key={car.id} car={car} view="mobile" />
          ))}
        </div>
      </section>
    </div>
  );
}
