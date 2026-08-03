import { FaFacebookF, FaYoutube } from "react-icons/fa";
import Logo from "./Logo";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer w-full bg-gray-900 p-10 text-gray-300 sm:footer-horizontal dark:bg-black dark:text-gray-300">
      <aside>
        <div className="flex justify-center gap-1 md:p-1.5">
          <div>
            <Logo textColor="text-white" />
            <p className="mt-2">
              Institute of Global Skills and Communication
              <br />
              Providing reliable tech since 1992
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-white bg-yellow-600 p-1 md:p-1.5">
            <a href="#" className="link link-hover">
              <FaFacebookF className="text-md md:text-xl" />
            </a>
          </div>
          <div className="rounded-full border border-white bg-yellow-600 p-1 md:p-1.5">
            <a href="#" className="link link-hover">
              <MdEmail className="text-md md:text-xl" />
            </a>
          </div>
          <div className="rounded-full border border-white bg-yellow-600 p-1 md:p-1.5">
            <a href="#" className="link link-hover">
              <FaLinkedin className="text-md md:text-xl" />
            </a>
          </div>
          <div className="rounded-full border border-white bg-yellow-600 p-1 md:p-1.5">
            <a href="#" className="link link-hover">
              <FaYoutube className="text-md md:text-xl" />
            </a>
          </div>
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <Link to="/services" className="link link-hover">
          All services
        </Link>
        <Link to="/courses" className="link link-hover">
          Courses
        </Link>
        <a href="/#partnership" className="link link-hover">
          Partnership
        </a>
        <Link to="/about-us" className="link link-hover">
          About IGSC
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <Link to="/about-us" className="link link-hover">
          About us
        </Link>
        <Link to="/community" className="link link-hover">
          Community
        </Link>
        <Link to="/health-campaign" className="link link-hover">
          Health Campaign
        </Link>
        <a href="/#partnership" className="link link-hover">
          Contact
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
