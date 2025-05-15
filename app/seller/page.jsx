'use client';
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const services = [
  { name: "Konsultasi/Pengajaran", price: 50000 },
  { name: "Uji Validitas", price: 100000 },
  { name: "Uji Reabilitas", price: 100000 },
  { name: "Penskalaan Instrumen (Scalling)", price: 150000 },
  { name: "Eksplorasi Data", price: 150000 },
  { name: "Visualisasi Data", price: 150000 },
  { name: "Eksplorasi Spasial", price: 200000 },
  { name: "Analisis Korelasi", price: 80000 },
  { name: "Regresi Linear Sederhana*", price: 200000 },
  { name: "Regresi Linear Berganda*", price: 225000 },
  { name: "Regresi Ridge, Weight Least Square*", price: 225000 },
  { name: "Regresi Nonlinear*", price: 250000 },
  { name: "Regresi Logistik Biner*", price: 300000 },
  { name: "Regresi Logistik Multinomial*", price: 350000 },
  { name: "Regresi Data Panel*", price: 350000 },
  { name: "Regresi Spasial*", price: 350000 },
  { name: "GWR (Geographically Weighted Regression)*", price: 400000 },
  { name: "GWPR (Geographically Weghted Poisson Regression)*", price: 550000 },
  { name: "GTWR (Geographically and Temporally Weighted Regression)*", price: 550000 },
  { name: "Uji Lanjut", price: 150000 },
  { name: "Uji T", price: 200000 },
  { name: "ANOVA One-Way", price: 200000 },
  { name: "ANOVA Two-Way", price: 200000 },
  { name: "Repeated Measures ANOVA", price: 200000 },
  { name: "ANCOVA", price: 200000 },
  { name: "Uji Mann-Whitney", price: 200000 },
  { name: "Uji Wilcoxon", price: 200000 },
  { name: "Uji Friedman", price: 200000 },
  { name: "Uji Kruskal-Wallis", price: 200000 },
  { name: "Uji Chi-Square", price: 200000 },
  { name: "Uji Scott-Knott", price: 250000 },
  { name: "PCA (Pricipal Component Analysis)", price: 250000 },
  { name: "Analisis Cluster", price: 250000 },
  { name: "Analisis Faktor", price: 250000 },
  { name: "Analisis Korespondensi", price: 250000 },
  { name: "Analsis Diskriminan", price: 250000 },
  { name: "Analsis Korelasi Kanonik", price: 250000 },
  { name: "Analisis Konjoin", price: 250000 },
  { name: "MANOVA", price: 300000 },
  { name: "MANCOVA", price: 300000 },
  { name: "Analsis Faktor Eksplanatori & Asusmsi", price: 350000 },
  { name: "Analisis Faktor Konfirmatori & Asumsi", price: 350000 },
  { name: "SEM PLS", price: 450000 },
  { name: "SEM AMOS", price: 500000 },
  { name: "Supervised Learning", price: 300000 },
  { name: "Unsupervised Learning", price: 300000 },
  { name: "ARIMA", price: 350000 },
  { name: "ARIMAX", price: 400000 },
  { name: "SARIMA", price: 400000 },
  { name: "SARIMAX", price: 450000 },
  { name: "ARCH", price: 450000 },
  { name: "GARCH", price: 500000 },
  { name: "Lainnya", price: " Based on analyst"}
];

const AddProduct = () => {
  const { addProduct } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Retail');
  const [analyst, setAnalyst] = useState('John Doe');
  const [selectedService, setSelectedService] = useState(services[0].name);
  const [price, setPrice] = useState(services[0].price);
  const [successMessage, setSuccessMessage] = useState('');

  const analysts = [
    "John Doe",
    "Jane Smith",
    "Alex Johnson",
    "Maria Garcia"
  ];

  const handleServiceChange = (e) => {
    const selected = e.target.value;
    setSelectedService(selected);
    const serviceObj = services.find(s => s.name === selected);
    setPrice(serviceObj ? serviceObj.price : 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedFiles = files.map(file => URL.createObjectURL(file));

    const newProduct = {
      _id: Date.now().toString(),
      name: `${name} - ${selectedService}`, // gabungkan judul + layanan
      description,
      category,
      analyst,
      images: uploadedFiles,
      price,
      offerPrice: 0,
    };

    addProduct(newProduct);

    setSuccessMessage("Analisis berhasil ditambahkan!");

    setName('');
    setDescription('');
    setCategory('Retail');
    setAnalyst('John Doe');
    setFiles([]);
    setSelectedService(services[0].name);
    setPrice(services[0].price);
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">

        {/* Upload files */}
        <div>
        <p className="text-base font-medium">Upload Data (CSV/Excel/PDF)</p>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          {[...Array(4)].map((_, index) => (
            <label key={index} htmlFor={`image${index}`} className="relative cursor-pointer">
              <input
                onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }}
                type="file"
                id={`image${index}`}
                hidden
                accept=".csv,.xlsx,.xls,.pdf"
              />
              {files[index] ? (
                files[index].type === "application/pdf" ? (
                  // Kalau file PDF, tampilkan ikon/pdf placeholder
                  <div className="w-[100px] h-[100px] flex items-center justify-center border border-gray-300 rounded bg-gray-100 text-gray-700">
                    PDF File
                  </div>
                ) : (
                  // Kalau gambar, preview pakai URL.createObjectURL
                  <Image
                    className="max-w-24"
                    src={URL.createObjectURL(files[index])}
                    alt={`File preview ${index}`}
                    width={100}
                    height={100}
                  />
                )
              ) : (
                // Kalau belum ada file, tampilkan icon upload (assets.upload_area)
                <Image
                  className="max-w-24"
                  src={assets.upload_area}
                  alt="Upload file"
                  width={100}
                  height={100}
                />
              )}
            </label>
          ))}
        </div>
      </div>


        {/* Judul Analisis */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Judul Analisis
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        {/* Layanan / Service */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="service">
            Pilih Layanan
          </label>
          <select
            id="service"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={handleServiceChange}
            value={selectedService}
          >
            {services.map(service => (
              <option key={service.name} value={service.name}>
                {service.name} - Rp{service.price.toLocaleString("id-ID")}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-600">
            Harga: Rp{price.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Deskripsi Analisis */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">
            Deskripsi Analisis
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        {/* Kategori Bisnis */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Kategori Bisnis
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Retail">Retail</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Education">Education</option>
              <option value="Transportation">Transportation</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
        </div>

        {/* Analyst */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="analyst">
            Analyst
          </label>
          <select
            id="analyst"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setAnalyst(e.target.value)}
            value={analyst}
            required
          >
            {analysts.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded">
          ADD
        </button>

        {successMessage && (
          <p className="text-green-600 font-medium mt-2">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
