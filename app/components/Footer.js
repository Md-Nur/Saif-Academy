
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 mx-2"
                aria-label="Facebook"
              >
                <FaFacebook className="w-8 h-8"/>
                 </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 mx-2"
                aria-label="Twitter"
              >
               <FaTwitter className="w-8 h-8" />
                </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 mx-2"
                aria-label="Youtube"
              >
                <FaYoutube className="w-8 h-8" />
                </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2023 Saif Academy. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  