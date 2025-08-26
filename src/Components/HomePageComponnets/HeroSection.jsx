import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Star, Edit3, MessageCircle, ThumbsUp, Award, Zap, Search, Quote } from 'lucide-react';

function Container({ children }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-[70vh] md:min-h-[80vh] bg-gradient-to-b from-white to-amber-50 relative overflow-hidden pt-16 md:pt-20">
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          @keyframes waveFlow {
            0% {
              transform: translateX(-100px);
            }
            100% {
              transform: translateX(100px);
            }
          }
          .animate-wave {
            animation: waveFlow 6s ease-in-out infinite;
          }
          .animate-wave-delayed {
            animation: waveFlow 6s ease-in-out infinite;
            animation-delay: 1.5s;
          }
          .animate-wave-slow {
            animation: waveFlow 8s ease-in-out infinite;
            animation-delay: 3s;
          }
        `}
      </style>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Floating Stars */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute animate-float"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          >
            <Star 
              className="w-3 h-3 md:w-4 md:h-4 text-amber-400 opacity-70" 
              fill="currentColor"
            />
          </div>
        ))}

        {/* Floating Pencils */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`pencil-${i}`}
            className="absolute animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <Edit3 
              className="w-4 h-4 md:w-5 md:h-5 text-amber-500 opacity-50" 
            />
          </div>
        ))}

        {/* Subtle Dots */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={`dot-${i}`}
            className={`absolute rounded-full animate-float ${
              i % 3 === 0 ? 'w-1.5 h-1.5 bg-amber-400' : 
              i % 3 === 1 ? 'w-2 h-2 bg-amber-500' : 
              'w-1 h-1 bg-amber-300'
            } opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Left Side Decorative Elements */}
      <div className="absolute left-0 top-1/3 -translate-y-1/2 z-10 hidden lg:block">
        <div className="relative">
          {/* Curved Line */}
          <svg className="absolute left-16 top-14 w-24 h-24 text-amber-300 opacity-60" viewBox="0 0 100 100">
            <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
          </svg>
          
          {/* Small Floating Elements */}
          <div className="absolute -left-4 top-32 animate-float" style={{ animationDelay: '1.2s' }}>
            <ThumbsUp className="w-6 h-6 text-amber-500 opacity-70" />
          </div>
        </div>
      </div>

      {/* Right Side Decorative Elements */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 z-10 hidden lg:block">
        <div className="relative">
          {/* Curved Line (Mirrored) */}
          <svg className="absolute right-16 top-14 w-24 h-24 text-amber-300 opacity-60" viewBox="0 0 100 100">
            <path d="M90,50 Q70,10 50,50 T10,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
          </svg>
          
          {/* Small Floating Elements */}
          <div className="absolute right-0 top-0 animate-float" style={{ animationDelay: '0.8s' }}>
            <MessageCircle className="w-6 h-6 text-amber-500 opacity-70" />
          </div>
          <div className="absolute right-4 top-40 animate-float" style={{ animationDelay: '1.5s' }}>
            <Award className="w-5 h-5 text-amber-400 opacity-60" />
          </div>
          <div className="absolute right-20 top-20 animate-float" style={{ animationDelay: '2s' }}>
            <Zap className="w-4 h-4 text-amber-600 opacity-50" />
          </div>
        </div>
      </div>

      {/* Animated Wave Pattern at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
        <svg
          className="relative w-full h-25"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            className="animate-wave"
            d="M-100,60 C200,20 500,60 1100,40 C1150,38 1200,40 1300,42 L1300,120 L-100,120 Z"
            fill="rgba(251, 191, 36, 0.25)"
          />
          <path
            className="animate-wave-delayed"
            d="M-100,50 C300,10 700,50 1100,30 C1150,28 1200,30 1300,32 L1300,120 L-100,120 Z"
            fill="rgba(251, 191, 36, 0.2)"
          />
          <path
            className="animate-wave-slow"
            d="M-100,70 C250,30 550,70 1100,50 C1150,48 1200,50 1300,52 L1300,120 L-100,120 Z"
            fill="rgba(251, 191, 36, 0.15)"
          />
        </svg>
      </div>

      <Container>
        <div className="relative z-20 text-center px-4 flex items-center justify-center min-h-[50vh] md:min-h-[60vh]">
          <div className="w-full max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Discover the Best
              <span className="text-amber-600 block">Reviews</span>
            </h1>
            
            <div>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
                Share your experiences, read honest reviews, and make informed decisions with our community
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <div className="flex shadow-md rounded-lg overflow-hidden">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search for products, services..." 
                    className="w-full pl-10 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 transition-colors duration-300">
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
              onClick={()=> navigate("/companies/us&87juhsh7huh77hyh7")}
              
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                Write a Review
              </button>
              <button className="px-6 py-3 border border-amber-600 text-amber-700 hover:bg-amber-50 font-medium rounded-lg transition-colors duration-300">
                Browse Reviews
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;