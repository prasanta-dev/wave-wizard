
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import device from "../assets/device.png";
import useDate_and_Time from '../hook/Date_and_TIme'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import '../App.css'


function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { formattedTime, formattedDate } = useDate_and_Time();

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      navigate("/controlPage");
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [loading, navigate]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-white">
      {/* Loader */}
      {loading && <Loader />}


      {/* Hero Section */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

          {/* Left Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Navbar */}
            <Navbar />
            <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-6xl">
              Elevate Your
              <span className="block bg-linear-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Living Experience
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400 sm:text-base sm:leading-5">
              Experience the future of smart living. Your Home's Maestro —
              control lights, fans, and more effortlessly with
              <span>
                <span className="text-blue-500"> G</span><span className="text-red-500">o</span><span className="text-amber-400">o</span><span className="text-blue-500">g</span><span className="text-emerald-500">l</span><span className="text-red-500">e</span>
                <span className="text-gray-400"> Assistant,</span>
              </span>
              <span className="text-sky-400"> Alexa </span>
              and our <span className="text-sky-400">Web Platform</span>.
            </p>

            {/* Get Started Button */}
            <button
              onClick={() => setLoading(true)}
              disabled={loading}
              className="mt-9 flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:scale-105 hover:bg-cyan-300 active:scale-95 disabled:opacity-60 sm:text-base cursor-pointer"
            >
              <span>Get Started</span>

              <IoIosArrowDroprightCircle className="text-4xl" />
            </button>

            {/* Bottom Features */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-slate-400 sm:gap-10 lg:justify-start sm:text-sm">
              <span>✦ Smart Automation</span>
              <span>✦ Easy Control</span>
              <span>✦ Modern Living</span>
            </div>

          </div>

          {/* Right Image */}
          <div className="relative flex items-center justify-center hover:scale-105 transition-transform duration-500">

            {/* Glow Effect */}
            <div className="absolute h-56 w-56 rounded-full bg-cyan-500/20 blur-[100px] sm:h-80 sm:w-80" />
            <div className="relative">
              <div className="absolute -top-29 left-29 bg-black text-white w-24 h-8 z-50">
                <div className="flex flex-col items-center">
                  <span className="text-[12px] p-0 m-0">{formattedDate && formattedDate}</span>
                  <span className="text-[18px]">{formattedTime && formattedTime}</span>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">

              {/* Continuous Alexa RGB Glow */}
              <div className="absolute top-[2%] left-1/2
    -translate-x-1/2
    w-52 h-28 sm:w-72 sm:h-36
    rounded-full
    alexa-rgb-glow
    pointer-events-none z-0"
              />

              {/* Device */}
              <img
                src={device}
                alt="Smart home control device"
                className="relative z-10 max-w-80 object-contain drop-shadow-2xl"
              />

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;
