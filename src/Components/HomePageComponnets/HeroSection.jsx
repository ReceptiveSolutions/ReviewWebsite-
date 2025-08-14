import React from 'react';
import {Divider} from '../../index'

function Container({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function HeroSection() {
  return (
    <>
      <section className="w-full min-h-[60vh] md:min-h-[75vh] bg-gradient-to-br from-amber-900 to-amber-800 flex items-center justify-center relative overflow-hidden">
        
        {/* Background Circles - Positioned behind content */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Large Circle - Behind everything */}
          <div className="absolute -right-40 -top-40 w-64 h-64 md:w-96 md:h-96 rounded-full bg-amber-700 opacity-10 animate-rotate1"></div>
          
          {/* Medium Circle - Behind everything */}
          <div className="absolute -left-20 -bottom-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-amber-600 opacity-15 animate-rotate2"></div>
          
          {/* Small Circles - Behind everything */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 md:w-12 md:h-12 rounded-full bg-amber-400 opacity-30 animate-float1"></div>
          <div className="absolute top-1/3 right-1/5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-amber-300 opacity-30 animate-float2"></div>
          <div className="absolute bottom-1/4 right-1/3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500 opacity-30 animate-float3"></div>
          
          {/* Particle Effects - Behind everything */}
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-300 opacity-20 animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Animated Wave at Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
          <svg
            className="relative w-full"
            style={{ height: '120px' }}
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C300,10 600,90 1200,50 L1200,100 L0,100 Z"
              fill="rgba(251, 191, 36, 0.3)"
              style={{
                animation: 'wave1 8s ease-in-out infinite',
              }}
            />
            <path
              d="M0,60 C400,20 800,100 1200,60 L1200,100 L0,100 Z"
              fill="rgba(180, 83, 9, 0.2)"
              style={{
                animation: 'wave2 6s ease-in-out infinite reverse',
              }}
            />
            <path
              d="M0,70 C300,30 900,110 1200,70 L1200,100 L0,100 Z"
              fill="rgba(120, 53, 15, 0.1)"
              style={{
                animation: 'wave3 10s ease-in-out infinite',
              }}
            />
          </svg>
        </div>

        <style jsx>{`
          @keyframes wave1 {
            0%, 100% {
              d: path('M0,50 C300,10 600,90 1200,50 L1200,100 L0,100 Z');
            }
            50% {
              d: path('M0,40 C300,80 600,20 1200,60 L1200,100 L0,100 Z');
            }
          }

          @keyframes wave2 {
            0%, 100% {
              d: path('M0,60 C400,20 800,100 1200,60 L1200,100 L0,100 Z');
            }
            50% {
              d: path('M0,80 C400,40 800,120 1200,40 L1200,100 L0,100 Z');
            }
          }

          @keyframes wave3 {
            0%, 100% {
              d: path('M0,70 C300,30 900,110 1200,70 L1200,100 L0,100 Z');
            }
            50% {
              d: path('M0,50 C300,90 900,50 1200,90 L1200,100 L0,100 Z');
            }
          }

          @keyframes float1 {
            0%, 100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(-10px, -15px);
            }
          }

          @keyframes float2 {
            0%, 100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(8px, 12px);
            }
          }

          @keyframes float3 {
            0%, 100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(5px, -10px);
            }
          }

          @keyframes rotate1 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes rotate2 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }

          @keyframes particle {
            0% {
              transform: translate(0, 0);
              opacity: 0;
            }
            10% {
              opacity: 0.2;
            }
            90% {
              opacity: 0.2;
            }
            100% {
              transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px);
              opacity: 0;
            }
          }
        `}</style>

        <Container>
          <div className="relative z-20 text-center px-4">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  Our Site
                </span>
              </h1>
              
              <div>
                <p className="text-lg sm:text-xl text-amber-100 mb-6 md:mb-8 max-w-2xl mx-auto">
                  Experience warm design with elegant circular elements
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="px-6 py-3 sm:px-8 sm:py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
                  Get Started
                </button>
                <button className="px-6 py-3 sm:px-8 sm:py-4 border border-amber-400 text-amber-100 hover:bg-amber-600 hover:text-white font-semibold rounded-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Enhanced Divider */}
     <Divider></Divider>
    </>
  );
}

export default HeroSection;