import { Link } from "react-router-dom";
import {
  Search,
  Flame,
  Car,
  Wrench,
  Palette,
  Star,
  Users,
  Award,
  ArrowRight,
  Play,
} from "lucide-react";

export default function Home() {
  const services = [
    {
      title: "Performance Tuning",
      description:
        "Engine optimization and ECU remapping for maximum power and efficiency",
      icon: Flame,
      color: "from-red-500 to-orange-500",
      features: ["ECU Remapping", "Turbo Upgrades", "Exhaust Systems"],
    },
    {
      title: "Body Kits & Aerodynamics",
      description: "Custom body kits, spoilers, and aerodynamic enhancements",
      icon: Car,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Carbon Fiber Kits",
        "Wide Body Conversions",
        "Spoiler Systems",
      ],
    },
    {
      title: "Wheels & Suspension",
      description: "Premium alloy wheels and performance suspension systems",
      icon: Wrench,
      color: "from-purple-500 to-pink-500",
      features: ["Forged Alloys", "Coilover Systems", "Brake Upgrades"],
    },
    {
      title: "Paint & Wraps",
      description: "Professional paint jobs and premium vinyl wraps",
      icon: Palette,
      color: "from-green-500 to-emerald-500",
      features: ["Custom Paint Jobs", "PPF Protection", "Vinyl Wraps"],
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Customers", icon: Users },
    { number: "50+", label: "Awards Won", icon: Award },
    { number: "4.9", label: "Customer Rating", icon: Star },
    { number: "10+", label: "Years Experience", icon: Flame },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl p-8 md:p-12 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Flame className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">
                Premium Auto Customization
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Dream Car
              </span>{" "}
              Into Reality
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Professional auto customization services with cutting-edge
              technology and premium materials. From performance upgrades to
              stunning visual modifications.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link
                to="/customize"
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Start Customizing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Services Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Premium Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive auto customization solutions tailored to your specific
            needs and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/services"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mt-6 group-hover:translate-x-1 transition-transform duration-300"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 md:p-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join hundreds of satisfied customers who have trusted us with their
            dream car modifications
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
            >
              Get Started Today
            </Link>
            <Link
              to="/services"
              className="border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
