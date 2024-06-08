import React from 'react'

const ErrorPage404 = () => {
  console.log(' in 404 page');
  return (
    <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
            <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p>
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">Path Error</p>
            <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">Page not Found.</p>
        </div>
    </div>
  )
}

export default ErrorPage404
