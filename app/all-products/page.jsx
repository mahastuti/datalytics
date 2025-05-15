'use client';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Handbook = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center py-10 px-4 md:px-10">
                <h1 className="text-2xl font-semibold mb-4 text-blue-800">Booklet</h1>
                <iframe
                    src="/Datalytics.pdf"
                    width="100%"
                    height="800px"
                    className="border shadow-lg"
                />
            </div>
            <Footer />
        </>
    );
};

export default Handbook;
