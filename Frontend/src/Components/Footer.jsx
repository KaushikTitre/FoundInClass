import React from 'react'

function Footer() {
  return (
   <>
   <footer className="bg-gray-900 text-gray-300 py-8 px-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">About Us</h2>
          <p className="text-sm">
            FoundInClass is a college portal that helps students report, find,
            and reclaim lost items quickly and securely.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
          <p className="text-sm">Email: support@foundinclass.com</p>
          <p className="text-sm">Helpdesk: +91 98765 43210</p>
        </div>

        {/* Help/FAQ Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Help / FAQ</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">How to post an item</li>
            <li className="hover:text-white cursor-pointer">How to claim an item</li>
            <li className="hover:text-white cursor-pointer">Safety & Verification</li>
          </ul>
        </div>
      </div>

      {/* Social + Copyright */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
        {/* Social Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="hover:text-white">Facebook</a>
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">Twitter</a>
        </div>
        
        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} FoundInClass | Your College Name
        </p>
      </div>
    </footer>
   </>
    )
}

export default Footer
