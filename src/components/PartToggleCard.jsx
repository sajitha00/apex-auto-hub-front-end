export default function PartToggleCard({ part, isSelected, onToggle }) {
  const IconComponent = part.icon;

  return (
    <label
      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
        isSelected
          ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-400 shadow-md"
          : "bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(part.key)}
          className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <IconComponent
          className={`w-5 h-5 mr-3 ${
            isSelected ? "text-blue-600" : "text-gray-600"
          }`}
        />
        <span
          className={`font-medium ${
            isSelected ? "text-blue-800" : "text-gray-800"
          }`}
        >
          {part.name}
        </span>
      </div>
      <span
        className={`font-semibold ${
          isSelected ? "text-blue-600" : "text-gray-600"
        }`}
      >
        ${part.price}
      </span>
    </label>
  );
}
