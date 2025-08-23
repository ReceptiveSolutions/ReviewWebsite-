import React from 'react';

const BackgroundDecorations = () => {
  return (
    <>
      {/* Large subtle circles */}
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-200 opacity-20"></div>
      <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-gray-300 opacity-15"></div>
      
      {/* Medium geometric shapes */}
      <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-amber-300 opacity-25 rotate-45 rounded-2xl"></div>
      <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-gray-400 opacity-20 rotate-12 rounded-3xl"></div>
      
      {/* Small accent elements */}
      <div className="absolute left-1/3 top-20 w-16 h-16 bg-amber-400 opacity-30 rounded-full"></div>
      <div className="absolute right-1/3 bottom-16 w-12 h-12 bg-gray-500 opacity-25 rounded-full"></div>
      
      {/* Subtle triangular elements */}
      <div className="absolute left-0 top-1/2 w-0 h-0 border-l-[80px] border-l-transparent border-b-[160px] border-b-amber-300 opacity-20"></div>
      <div className="absolute right-0 bottom-1/3 w-0 h-0 border-r-[100px] border-r-transparent border-t-[200px] border-t-gray-400 opacity-15"></div>
    </>
  );
};

export default BackgroundDecorations;