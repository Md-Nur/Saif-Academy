"use client";
import { useState, useEffect } from "react";

const Batch = () => {
  const [data, setData] = useState([{}])
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    // fetch("http://localhost:8000/batches")
    fetch("https://saif-academy-fodq-67swgz5ub-md-nur.vercel.app/batches")
      .then((res) => res.json())
      .then((data) => {
          console.log(typeof(data))
        setData(data);
        setLoading(false);
      });
    }, []);

    if (isLoading) return <p className="h-screen text-2xl flex justify-center items-center">Loading...</p>;
    
    console.log(data);
    
    return (
        <div className="container mx-auto p-8">
        <h2 className="text-5xl font-bold mb-5 text-center">Batches</h2>
        <div className="sm:m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {data.map((batch) => (
         
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={batch.imgUrl}
            alt="Card Image"
            className="w-full h-48 object-cover"
            />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{batch.title}</h2>
            <p className="text-gray-700 mb-4">
              {batch.desc}
              </p>
            <div className="flex justify-evenly">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Details
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                Enroll
              </button>
            </div>
          </div>
        </div>
            ))}

            {/* 
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://unmesh.com/media/Images/Unmesh/Program/MAP23F.png"
            alt="Card Image"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Card Title 1</h2>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              fringilla massa a sem ultrices, eget auctor justo condimentum.
            </p>
            <div className="flex justify-evenly">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Details
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                Enroll
              </button>
            </div>
          </div>
        </div>

       */}
               {/* Repeat the above card structure for other cards */}
        </div> 
    </div>
  );
};

export default Batch;
