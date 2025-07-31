export default function RegularCarItem({ car, view }) {
  const badgeColor =
    car.condition === "Excellent"
      ? "bg-green-100 text-green-800"
      : car.condition === "Great"
      ? "bg-blue-100 text-blue-800"
      : "bg-yellow-100 text-yellow-800";

  if (view === "desktop") {
    return (
      <tr className="hover:bg-gray-50">
        <td className="p-4">
          <div className="flex items-center gap-4">
            <img
              src={car.image}
              alt={car.model}
              className="w-16 h-10 object-cover rounded-full"
            />
            <span className="text-sm font-semibold text-gray-800">
              {car.model}
            </span>
          </div>
        </td>
        <td className="p-4 text-sm text-gray-500">{car.totalRun}</td>
        <td className="p-4">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badgeColor}`}
          >
            {car.condition}
          </span>
        </td>
        <td className="p-4 text-sm font-medium text-gray-800">
          {car.askingPrice}
        </td>
        <td className="p-4">
          <button
            className={`px-3 py-3 rounded-full text-xs font-semibold ${car.buttonColor} hover:bg-blue-500 hover:text-white transition-opacity`}
          >
            See details ▸
          </button>
        </td>
      </tr>
    );
  }

  // Mobile view
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <img
          src={car.image}
          alt={car.model}
          className="w-20 h-12 object-cover rounded-xl"
        />
        <div>
          <div className="text-base font-semibold text-gray-800">
            {car.model}
          </div>
          <div className="text-xs text-gray-500">{car.totalRun}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badgeColor}`}
        >
          {car.condition}
        </span>
        <span className="text-sm font-medium text-gray-800">
          {car.askingPrice}
        </span>
      </div>
      <button
        className={`w-full mt-2 px-3 py-2 rounded-full text-xs font-semibold ${car.buttonColor} hover:bg-blue-500 hover:text-white transition-opacity`}
      >
        See details ▸
      </button>
    </div>
  );
}
