import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { homeData } from '../../api/getData';
import { useState } from 'react';

function Mid() {
  const navigate = useNavigate();
  function handleClick1() {
    navigate('/PostLost');
  }
  function handleClick2() {
    navigate('/PostFound');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await homeData();
        setfoundIteam(Response.data.foundLength);
        setlostIteam(Response.data.lostLength);
        setmatchIteam(Response.data.matchLength);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []); // [] ensures it runs once on mount
  
  const [lostIteam , setlostIteam] = useState(0);
  const [foundIteam , setfoundIteam] = useState(0);
  const [matchIteam , setmatchIteam] = useState(0);
  
  // Sample data - you can replace with actual data
  const stats = {
    lostItems: lostIteam,
    foundItems: foundIteam,
    matchedFound: matchIteam
  };
  


  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 py-20">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Never Lose Track
            </span>
            <br />
            <span className="text-gray-800">Of Your Belongings</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Connecting students with their lost items through our campus-wide community platform
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <button 
              onClick={handleClick1} 
              className="relative group px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Post Lost Item</span>
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button 
              onClick={handleClick2} 
              className="relative group px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Post Found Item</span>
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Lost Items Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{stats.lostItems}</h3>
              <p className="text-gray-600 font-medium">Lost Items</p>
              <p className="text-sm text-gray-500 mt-2">Items waiting to be found</p>
            </div>

            {/* Found Items Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{stats.foundItems}</h3>
              <p className="text-gray-600 font-medium">Found Items</p>
              <p className="text-sm text-gray-500 mt-2">Items waiting for owners</p>
            </div>

            {/* Active Users Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{stats.matchedFound}</h3>
              <p className="text-gray-600 font-medium">Matched/Verified Iteam</p>
              <p className="text-sm text-gray-500 mt-2">Iteams that are matched and verified</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Mid;