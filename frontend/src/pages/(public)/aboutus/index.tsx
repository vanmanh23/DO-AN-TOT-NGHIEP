import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img_about_us from "./../../../assets/image_about_us.png";

export default function Component() {
  const navigate = useNavigate();
  return (
     <div className="relative w-full h-screen flex items-center justify-center bg-white">
                    <div className="absolute z-40 top-0 left-0 flex flex-row justify-start bg-transparent py-4">
                      <ArrowLeft className="ml-4 cursor-pointer" size={24} onClick={() => navigate(-1)}/>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex">
                        <div className="w-2/12 h-full bg-green-100">
                        </div>
                        <div className="w-10/12 h-full">
                        </div>
                    </div>
                    <div className="relative w-9/12 h-5/6 bg-white shadow-2xl rounded-sm flex items-start justify-start">
                        <div className="w-1/2 h-full flex flex-col items-start justify-start p-16">
                            <div className="text-2xl text-blue-400 font-bold mb-12">Logo</div>
                            <div className="text-6xl text-blue-800 font-bold mb-4">About</div>
                            <div className="text-6xl text-blue-800 font-bold mb-8">Us</div>
                            <div className="text-gray-500 mb-8">Lorem Ipsum dolor sit amet, consectetuer adipiscingelit.</div>
                            <button className="bg-blue-800 text-white px-6 py-2 rounded-md">Read More</button>
                            <div className="flex items-center justify-start mt-20 space-x-2">
                                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            </div>
                        </div>
                        <div className="w-1/2 h-full flex items-center justify-center">
                            <img src={img_about_us} alt="Illustration of a diverse team of people celebrating and working together in a modern office environment." />
                        </div>
                    </div>
                </div>
  )
}
