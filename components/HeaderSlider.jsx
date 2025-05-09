import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const HeaderSlider = () => {
  const sliderData = [
    { id: 1, imgSrc: assets.header_datalytics },
    { id: 2, imgSrc: assets.header_1 },
    { id: 3, imgSrc: assets.header_2 },
    { id: 4, imgSrc: assets.header_3 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden">
      {/* Carousel */}
      <div
        className="flex transition-transform duration-1000 fade-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between py-0 md:px-0 px-5 mt-6 rounded-xl min-w-full overflow-hidden"
          >
            <div className="relative flex items-center justify-center w-full h-96 overflow-hidden rounded-xl">
              <Image
                src={slide.imgSrc}
                alt={`Slide ${slide.id}`}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center justify-center gap-2.5 mt-6">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-[#113565]" : "bg-gray-500/30"
            }`}
          />
        ))}
      </div>

      {/* Description + Button */}
      <div className="text-center mt-9 px-6 md:px-7">
        <h2 className="text-3xl md:text-4xl font-bold text-[#113565] mb-">
          Selamat Datang di Datalytics
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mt-6 mb-6 max-w-3xl mx-auto">
          Platform yang mempertemukan Anda dengan para profesional analisis data untuk mendukung keputusan bisnis yang lebih baik.
        </p>
        <Link href="/seller">
          <button className="bg-[#113565] hover:bg-[#0e2b53] text-white px-6 py-3 rounded-full font-semibold transition">
            Analisis Data Anda Sekarang
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderSlider;
