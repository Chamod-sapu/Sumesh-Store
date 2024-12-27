import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-8 mt-10 px-44 font-sans">
        <div className="container mx-auto px-4 flex flex-wrap justify-between">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h5 className="font-bold text-lg mb-2">About Us</h5>
              <p className="text-sm">
                We are a leading company in providing the best quality products and services.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0 pl-16">
              <h5 className="font-bold text-lg mb-2">Quick Links</h5>
              <ul className="text-sm">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Services</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h5 className="font-bold text-lg mb-2">Contact Us</h5>
              <p className="text-sm">
                Email: info@example.com<br />
                Phone: +123 456 7890
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm">&copy; 2023 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer