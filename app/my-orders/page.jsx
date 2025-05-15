'use client';
import React, { useState, useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const formatRupiah = (number) => {
  if (!number) return "0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const MyOrders = () => {
  const { products, removeProduct } = useAppContext();

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterAnalyst, setFilterAnalyst] = useState("All");

  // Get unique categories and analysts for filter dropdowns
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ["All", ...cats];
  }, [products]);

  const analysts = useMemo(() => {
    const ans = new Set(products.map(p => p.analyst));
    return ["All", ...ans];
  }, [products]);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      (filterCategory === "All" || p.category === filterCategory) &&
      (filterAnalyst === "All" || p.analyst === filterAnalyst)
    );
  }, [products, filterCategory, filterAnalyst]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen space-y-8">
        <div className="space-y-5">
          <h2 className="text-xl font-semibold mt-6">Your Analysis History</h2>

          {/* Filter controls */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div>
              <label htmlFor="filter-category" className="block mb-1 font-medium">
                Filter by Category
              </label>
              <select
                id="filter-category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border rounded px-3 py-2"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filter-analyst" className="block mb-1 font-medium">
                Filter by Analyst
              </label>
              <select
                id="filter-analyst"
                value={filterAnalyst}
                onChange={(e) => setFilterAnalyst(e.target.value)}
                className="border rounded px-3 py-2"
              >
                {analysts.map(an => (
                  <option key={an} value={an}>{an}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product list */}
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600">No analysis found for the selected filters.</p>
          ) : (
            <ul className="space-y-6">
              {filteredProducts.map((product) => (
                <li key={product._id} className="border p-4 rounded shadow bg-white relative">
                  <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-700 mb-2">{product.description}</p>

                  <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
                  <p className="text-sm text-gray-500 mb-2">Analyst: {product.analyst}</p>

                  {product.images && product.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {product.images.map((imgSrc, i) => (
                        <div key={i} className="w-20 h-20 relative rounded overflow-hidden border border-gray-300">
                          <Image
                            src={imgSrc}
                            alt={`Product Image ${i + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {(product.price || product.offerPrice) && (
                    <div className="text-sm text-gray-700 font-medium">
                      Price: {formatRupiah(product.price)}{' '}
                      {product.offerPrice && product.offerPrice > 0 && (
                        <span className="text-orange-600 font-semibold">
                          (Offer: {formatRupiah(product.offerPrice)})
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => removeProduct(product._id)}
                    className="absolute top-3 right-3 text-red-600 hover:text-red-800 font-semibold text-sm"
                    aria-label={`Remove ${product.name}`}
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
