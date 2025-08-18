
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-1 ">
      <div className="container mx-auto text-center mt-1">
        <p className="text-sm mb-1">
          &copy; {new Date().getFullYear()} JobSpot. All rights reserved.
        </p>
        <p className="text-sm">
          Made with <span className="text-red-500">&hearts;</span> in India
        </p>
        <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaLinkedinIn className='inline text-sm mb-1'/>
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaInstagram className='inline text-sm mb-1'/>
            </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer