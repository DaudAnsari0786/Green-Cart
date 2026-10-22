import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <div className="max-w-3xl w-full text-center">
        {/* 404 GIF / Image */}
        <div 
          className="w-full h-64 sm:h-80 md:h-96 bg-cover bg-center bg-no-repeat mx-auto"
          style={{
            backgroundImage: `url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')`
          }}
        >
          {/* Optional overlay text if you want the "404" over the image – you had it inside the div */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800 pt-8 sm:pt-12 md:pt-16">
            404
          </h1>
        </div>

        {/* Text and Button */}
        <div className="mt-6 sm:mt-10 space-y-4 sm:space-y-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
            Look like you're lost
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            The page you are looking for is not available!
          </p>

          <Link
            to="/home"
            className="inline-block px-13 sm:px-12 py-3 sm:py-3 text-white font-bold text-sm sm:text-base 
                       bg-gradient-to-r from-green-400 to-emerald-500 
                       rounded-full transition-all duration-300 
                       hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 
                       focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;