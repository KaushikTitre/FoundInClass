import React from 'react'
import { useNavigate } from 'react-router-dom'

function Mid() {
 const navigate = useNavigate();

 function handleClick1(){
  navigate('/PostLost');
 }
 function handleClick2(){
  navigate('/PostFound');
 }


  return (
  <>
   <section className="flex flex-col items-center justify-center text-center py-40 px-6 bg-gray-50">
      
      {/* Tagline */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Helping students find their belongings quickly and securely.
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Lost something in campus? Let’s bring it back to you.  
      </p>

      {/* Search Bar */}
      <div className="flex w-full max-w-2xl bg-white shadow-md rounded-full overflow-hidden mb-8">
        <input
          type="text"
          placeholder="Search for lost or found items..."
          className="flex-grow px-6 py-3 text-gray-700 focus:outline-none"
        />
        <button className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-all">
          Search
        </button>
      </div>

      {/* Call-to-action buttons */}
      <div className="flex space-x-6">
        <button onClick={handleClick1} className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all">
          Post Lost Item
        </button>
        <button onClick={handleClick2} className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all">
          Post Found Item
        </button>
      </div>
    </section>
  </>
  )
}

export default Mid
