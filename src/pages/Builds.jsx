import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Car,
  Trash2,
  Edit,
  Save,
  X,
  Calendar,
  DollarSign,
  Settings,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Builds() {
  const { user } = useSelector((state) => state.auth);
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBuild, setEditingBuild] = useState(null);
  const [editForm, setEditForm] = useState({
    carModel: "",
    color: "",
    selectedParts: [],
  });

  // Get API base URL from environment variable or fallback to localhost
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/builds/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBuilds(data);
        }
      } catch (error) {
        console.error("Error fetching builds:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchBuilds();
    }
  }, [user?.id]);

  const handleDelete = async (buildId) => {
    if (!window.confirm("Are you sure you want to delete this build?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/builds/${buildId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setBuilds(builds.filter((build) => build._id !== buildId));
        alert("Build deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to delete build: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting build:", error);
      alert("Error deleting build");
    }
  };

  const handleEdit = (build) => {
    setEditingBuild(build._id);
    setEditForm({
      carModel: build.carModel,
      color: build.color,
      selectedParts: build.selectedParts,
    });
  };

  const handleSaveEdit = async (buildId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/builds/${buildId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...editForm,
          totalPrice: currentBuild?.totalPrice || 0,
        }),
      });

      if (response.ok) {
        const updatedBuild = await response.json();
        setBuilds(
          builds.map((build) => (build._id === buildId ? updatedBuild : build))
        );
        setEditingBuild(null);
        alert("Build updated successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to update build: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating build:", error);
      alert("Error updating build");
    }
  };

  const handleCancelEdit = () => {
    setEditingBuild(null);
    setEditForm({
      carModel: "",
      color: "",
      selectedParts: [],
    });
  };

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center space-x-2 text-gray-500">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading your builds...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
          <Settings className="w-4 h-4 text-blue-600" />
          <span className="text-blue-600 text-sm font-medium">
            My Customizations
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
            Builds
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          View and manage your saved car customizations and modifications
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {builds.length}
              </div>
              <div className="text-sm text-gray-600">Total Builds</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                $
                {builds
                  .reduce((sum, build) => sum + (build.totalPrice || 0), 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {builds.length > 0
                  ? new Date(
                      Math.max(
                        ...builds.map((b) => new Date(b.createdAt).getTime())
                      )
                    ).toLocaleDateString()
                  : "N/A"}
              </div>
              <div className="text-sm text-gray-600">Latest Build</div>
            </div>
          </div>
        </div>
      </div>

      {builds.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-600 mb-4">
            No builds yet
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Start customizing cars to see your builds here. Create your first
            build and watch your collection grow!
          </p>
          <div className="flex justify-center">
            <button className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" />
              <span>Start Customizing</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {builds.map((build) => (
            <div
              key={build._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1 p-6"
            >
              {editingBuild === build._id ? (
                // Edit Mode
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">
                      Edit Build
                    </h3>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Car Model
                      </label>
                      <input
                        type="text"
                        value={editForm.carModel}
                        onChange={(e) =>
                          handleInputChange("carModel", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter car model..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Color
                      </label>
                      <input
                        type="text"
                        value={editForm.color}
                        onChange={(e) =>
                          handleInputChange("color", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter color..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Parts (comma separated)
                      </label>
                      <input
                        type="text"
                        value={editForm.selectedParts.join(", ")}
                        onChange={(e) =>
                          handleInputChange(
                            "selectedParts",
                            e.target.value
                              .split(", ")
                              .filter((part) => part.trim())
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter parts..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSaveEdit(build._id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {build.carModel}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: build.color.toLowerCase() }}
                        ></div>
                        <p className="text-sm text-gray-600 font-medium">
                          {build.color}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(build)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
                        title="Edit build"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(build._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
                        title="Delete build"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Selected Parts
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {build.selectedParts.map((part, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {part}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(build.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {build.totalPrice && (
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-green-600">
                            ${build.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
