import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from "@/assets/image/logo-white.png"

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand + Social */}
        <div>
          {/* <h2 className="text-2xl font-bold mb-4">MyBlog</h2> */}
           <img src={logo} alt="" width={120} className='bg-gray-100' />
          <p className="text-sm text-gray-600 mb-4">Sharing stories, ideas, and inspiration with the world.</p>
          <div className="flex space-x-4">
            <a href="#"><FaFacebook className="hover:text-blue-500" /></a>
            <a href="#"><FaTwitter className="hover:text-sky-400" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-400" /></a>
            <a href="#"><FaLinkedin className="hover:text-blue-300" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600  text-sm">
            <li><a href="#" className="hover:text-black">Blog</a></li>
            <li><a href="#" className="hover:text-black">Home</a></li>
            <li><a href="#" className="hover:text-black">About Us</a></li>
            <li><a href="#" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-sm text-gray-600  mb-4">Get the latest posts delivered right to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md text-black w-full sm:w-auto"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-900">
        &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
