import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Simulasikan proses subscribe
    setSuccessMessage("Terima kasih sudah subscribe newsletter kami!");
    setEmail("");

    // Reset notif setelah 3 detik
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pb-9">
      <h1 className="md:text-4xl text-2xl font-medium">
        Tetap Bersama Kami :)
      </h1>
      <p className="md:text-base text-gray-500/80 py-2 pb-5">
        Langganan <i>newsletter</i> kami biar bisa kami 'spam'<br />
        dengan penawaran seru, berita terbaru, dan diskon!
      </p>

      <form onSubmit={handleSubmit} className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Masukkan alamat email anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-[#113565] rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>

      {successMessage && (
        <p className="mt-3 text-green-600 font-medium">{successMessage}</p>
      )}
    </div>
  );
};

export default NewsLetter;
