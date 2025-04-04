import { Link } from "react-router-dom";
import videoBg from "../assets/video/video.mp4";
import videoPoster from "../assets/image/634838-studio-ghibli-wallpaper-archives-studio-ghibli-movies.jpg";
import { useEffect } from "react";
import Navbar from '../components/Navbar';

export default function IndexPage() {
  // Preload video for smoother experience
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = videoBg;
    link.as = 'video';
    document.head.appendChild(link);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col overflow-hidden">
      {/* Navbar positioned at the top */}
      <Navbar />
      
      {/* Main content container */}
      <div className="flex-grow flex items-center justify-center relative">
        {/* Background Video with fallback */}
        <div className="absolute top-0 left-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={videoPoster}
            className="w-full h-full object-cover scale-125"
            aria-label="Magical storybook background animation"
          >
            <source src={videoBg} type="video/mp4" />
            <source src={videoBg.replace('.mp4', '.webm')} type="video/webm" />
            <img src={videoPoster} alt="Storybook background" />
          </video>
        </div>
        
        {/* Enhanced overlay with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-indigo-900/40 to-black/70 animate-gradient-shift"></div>
        
        {/* Content with enhanced branding */}
        <div className="relative text-center text-white z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 group">
          {/* Brand Logo/Title */}
          <div className="mb-8 animate-float">
            <h1 className="text-5xl font-bold font-pacifico text-yellow-300 drop-shadow-lg">
              StoryWeaver AI
            </h1>
            <p className="mt-2 text-lg text-purple-100">Magical Tales Generator</p>
          </div>
          
          {/* Main Headline */}
          <h2 className="text-4xl font-extrabold sm:text-6xl lg:text-7xl mb-4 transition-all duration-500 group-hover:scale-105">
            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">Magical</span>
            <strong className="block font-extrabold text-yellow-300 mt-4 animate-pulse-slow">
              Mysterious Stories
            </strong>
          </h2>
          
          {/* Tagline */}
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl/relaxed text-gray-100 transition-all duration-300 group-hover:text-yellow-100">
            Unleash the power of AI to co-create enchanting tales with your creativity.
          </p>
          
          {/* CTA Button */}
          <div className="mt-12 animate-bounce-slow">
            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 px-10 py-5 text-xl font-bold text-white shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
              aria-label="Generate a new story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Generate Story
            </Link>
          </div>
          
          {/* Subtle decorative elements */}
          <div className="absolute -bottom-20 left-1/4 w-16 h-16 rounded-full bg-purple-500/20 blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-yellow-400/10 blur-xl animate-pulse-slow"></div>
        </div>
      </div>
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}