import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Car,
  Wrench,
  Palette,
  Settings,
  Clock,
  Calendar,
  Phone,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Award,
} from "lucide-react";

export default function Services() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    notes: "",
  });

  // Get API base URL from environment variable or fallback to localhost
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/services`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getIcon = (category) => {
    switch (category) {
      case "spoiler":
        return Wrench;
      case "wheels":
        return Car;
      case "wraps":
        return Palette;
      case "bodykit":
        return Settings;
      default:
        return Wrench;
    }
  };

  const getCategoryName = (category) => {
    switch (category) {
      case "spoiler":
        return "Spoiler Kits";
      case "wheels":
        return "Custom Wheels";
      case "wraps":
        return "Color Wraps";
      case "bodykit":
        return "Body Kits";
      default:
        return category;
    }
  };

  const handleBookService = (service) => {
    if (!isAuthenticated) {
      alert("Please login to book services!");
      return;
    }
    setSelectedService(service);
    setShowBooking(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/services/${selectedService._id}/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            date: bookingData.date,
            time: bookingData.time,
            notes: bookingData.notes,
          }),
        }
      );

      if (response.ok) {
        alert("Service booked successfully!");
        setShowBooking(false);
        setBookingData({ date: "", time: "", notes: "" });
      } else {
        alert("Failed to book service");
      }
    } catch (error) {
      alert("Error booking service");
      console.error(error);
    }
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const features = [
    {
      icon: Shield,
      title: "Warranty Included",
      description: "All services come with comprehensive warranty coverage",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      title: "Certified Technicians",
      description: "Expert mechanics with industry certifications",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Quick Turnaround",
      description: "Fast service without compromising quality",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all work",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
          <Wrench className="w-4 h-4 text-blue-600" />
          <span className="text-blue-600 text-sm font-medium">
            Professional Services
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Premium Auto{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
            Services
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional car modification services with cutting-edge technology
          and premium materials
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading services...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = getIcon(service.category);
            return (
              <div
                key={service._id}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {getCategoryName(service.category)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.name}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-blue-600">
                      ${service.price}
                    </span>
                    <span className="text-sm text-gray-500">starting</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm ml-1 font-medium">4.8</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>2-4 hours</span>
                  </div>
                  <button
                    onClick={() => handleBookService(service)}
                    className="group/btn bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Service Categories */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Service Categories
          </h2>
          <p className="text-gray-600">
            Comprehensive range of auto customization services
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Spoiler Kits",
              icon: Wrench,
              desc: "Aerodynamic enhancements",
              color: "from-red-500 to-orange-500",
            },
            {
              name: "Custom Wheels",
              icon: Car,
              desc: "Premium alloy wheels",
              color: "from-blue-500 to-cyan-500",
            },
            {
              name: "Color Wraps",
              icon: Palette,
              desc: "Vinyl wrapping services",
              color: "from-purple-500 to-pink-500",
            },
            {
              name: "Body Kits",
              icon: Settings,
              desc: "Complete body modifications",
              color: "from-green-500 to-emerald-500",
            },
          ].map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-gray-500 text-xs">{category.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Contact & Location</h2>
          <p className="text-gray-300">Get in touch with our expert team</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Colombo & Negombo</h3>
            <p className="text-gray-300">6 years of experience</p>
          </div>
          <div className="group text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">+94 11 234 5678</h3>
            <p className="text-gray-300">Call for booking</p>
          </div>
          <div className="group text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Mon-Sat: 9AM-6PM</h3>
            <p className="text-gray-300">Sunday: Closed</p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Book {selectedService.name}
              </h3>
              <p className="text-gray-600">Schedule your appointment</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingData.date}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time
                </label>
                <select
                  required
                  value={bookingData.time}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, time: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, notes: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  rows="3"
                  placeholder="Any special requirements..."
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">
                  Service:{" "}
                  <span className="font-semibold">{selectedService.name}</span>
                </p>
                <p className="text-xl font-bold text-blue-600">
                  Total: ${selectedService.price}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBooking(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
