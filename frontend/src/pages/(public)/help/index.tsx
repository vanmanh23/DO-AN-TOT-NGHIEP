import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Component() {
    const navigate = useNavigate(); 
  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="obsolute top-0 left-0 flex flex-row justify-start bg-transparent py-4 shadow-md">
        <ArrowLeft className="ml-4 cursor-pointer" size={24} onClick={() => navigate(-1)}/>
      </div>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-start h-96 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://healthcaresuccess.com/wp-content/uploads/2022/05/internal-medicine.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl font-semibold text-white mb-4">
            How can we help?
          </h1>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search for a topic or question"
              className="w-96 px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          What do you need help with?
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Lisque persius interesset his persequeris.
        </p>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* General Help */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center items-center h-16">
              <i className="fas fa-life-ring text-3xl text-blue-500"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
              General Help
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Porsius interessot his ot
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Quot quidam persequeris
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Mutat tacimates id sit.
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500 text-xs">
                <i className="far fa-file-alt"></i> 33 Topics
              </span>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          {/* Recharge & Bill Payment */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center items-center h-16">
              <i className="fas fa-bolt text-3xl text-blue-500"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
              Recharge & Bill Payment
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Porsius intoressot his ot
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Quot quidam persoqueris
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Mutat tacimates id sit.
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500 text-xs">
                <i className="far fa-file-alt"></i> 25 Topics
              </span>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          {/* Booking */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center items-center h-16">
              <i className="fas fa-clipboard-check text-3xl text-blue-500"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
              Booking
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Porsius intoresset his ot
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Quot quidam persequeris
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Mutat tacimates id sit.
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500 text-xs">
                <i className="far fa-file-alt"></i> 42 Topics
              </span>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          {/* My Account */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center items-center h-16">
              <i className="fas fa-user-circle text-3xl text-blue-500"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
              My Account
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Porsius intoressot his ot
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Quot quidam porsoqueris
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Mutat tacimatos id sit.
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500 text-xs">
                <i className="far fa-file-alt"></i> 32 Topics
              </span>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
