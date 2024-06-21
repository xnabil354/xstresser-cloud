import { FaInstagram, FaTelegram } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Image src="/xstresser.jpg" alt="XStresser Logo" width={120} height={120} />
            <p className="mt-4 text-center font-mono">
              XStresser Cloud Computing menyediakan layanan cloud yang handal dan cepat untuk kebutuhan bisnis Anda.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-mono mb-4">About Us</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/#price" className="hover:text-primary transition duration-300 font-mono">
                Product
              </Link>
              <Link href="/#testimonials" className="hover:text-primary transition duration-300 font-mono">
                Testimonials
              </Link>
              <Link href="/#faq" className="hover:text-primary transition duration-300 font-mono">
                FAQ
              </Link>
              <Link href="/orderhere" className="hover:text-primary transition duration-300 font-mono">
                Order Here
              </Link>
            </nav>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-mono mb-4 font-mono">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/xstresser" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-primary transition duration-300" />
              </a>
              <a href="https://t.me/xstresserpower" target="_blank" rel="noopener noreferrer">
                <FaTelegram className="text-2xl hover:text-primary transition duration-300" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center font-mono">
          <p>&copy; {new Date().getFullYear()} XStresser Cloud Computing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
