import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'


function About() {
  return (
    <div>
    <Navbar />
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center px-6 pt-20 pb-2">
      {/* Page Container */}
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
          About Us
        </h1>

        {/* Intro */}
        <p className="text-lg text-center text-gray-600 mb-10">
          Welcome to <span className="font-semibold">FoundInClass</span> – 
          a platform designed to help students and citizens securely report, 
          search, and recover lost belongings.
        </p>

        {/* Section: Mission */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to create a trusted digital space where users can quickly 
            report lost items, browse found objects, and connect with others 
            to recover valuable possessions. Our focus is on security, ease of use, 
            and accessibility for everyone.
          </p>
        </div>

        {/* Section: Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">
            What We Offer
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Post lost or found items with photos and details.</li>
            <li>Search and filter items by category and location.</li>
            <li>Secure communication between item owners and finders.</li>
            <li>Simple,interface for quick use.</li>
          </ul>
        </div>

        {/* Section: Vision */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We believe in building a community-driven system that fosters 
            responsibility, trust, and collaboration. With technology and 
            user participation, we envision a world where lost items find 
            their way back to their rightful owners faster and easier.
             </p>
           </div>
         </div>
       </div>
     <Footer />
   </div>
  )
}

export default About
