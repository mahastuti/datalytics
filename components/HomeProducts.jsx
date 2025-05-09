import React from "react";
import { useAppContext } from "@/context/AppContext";

const analysts = [
  {
    name: "Jane Doe",
    field: "E-commerce",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "John Smith",
    field: "Healthcare Analytics",
    linkedin: "https://www.linkedin.com/in/johnsmith",
  },
  {
    name: "Ayu Rahma",
    field: "Financial Services",
    linkedin: "https://www.linkedin.com/in/ayurahma",
  },
  {
    name: "Michael Tan",
    field: "Retail Intelligence",
    linkedin: "https://www.linkedin.com/in/michaeltan",
  },
  {
    name: "Sophia Lee",
    field: "Marketing Insights",
    linkedin: "https://www.linkedin.com/in/sophialee",
  },
  {
    name: "David Kim",
    field: "Supply Chain Analytics",
    linkedin: "https://www.linkedin.com/in/davidkim",
  },
  {
    name: "Olivia Johnson",
    field: "Data Science",
    linkedin: "https://www.linkedin.com/in/oliviajohnson",
  },
  {
    name: "Chris Lee",
    field: "Product Analytics",
    linkedin: "https://www.linkedin.com/in/chrislee",
  },
  {
    name: "Jessica Wang",
    field: "Customer Experience",
    linkedin: "https://www.linkedin.com/in/jessicawang",
  },
  {
    name: "Daniel Park",
    field: "Business Intelligence",
    linkedin: "https://www.linkedin.com/in/danielpark",
  }
];

const HomeProducts = () => {
  const { router } = useAppContext();

  return (
    <div className="flex flex-col items-start pt-14 px-4">
      <p className="text-2xl font-medium mb-6">Our Analysts</p>

      <div className="flex overflow-x-auto gap-4 w-full pb-4">
        {analysts.map((analyst, index) => (
          <div
            key={index}
            className="min-w-[280px] border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white flex-shrink-0"
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-24 h-24 rounded-full mb-4 flex items-center justify-center bg-blue-400`}
              >
                {/* Placeholder for the background circle */}
              </div>
              <h3 className="text-lg font-semibold">{analyst.name}</h3>
              <p className="text-sm text-gray-500">{analyst.field}</p>
              <a
                href={analyst.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-600 hover:underline text-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/")}
        className="mx-auto px-12 py-2.5 mb-8 border rounded text-gray-500/70 mt-6 hover:bg-slate-50/90 transition"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
