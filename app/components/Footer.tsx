import { MdEmail } from "react-icons/md";
import { AiOutlineLinkedin } from "react-icons/ai";
import Logo from "./Logo";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-6 md:px-20 py-10 mt-40">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">

                <Logo />


                <div>
                    <h2 className="text-xl font-semibold mb-2">Connect with Us</h2>
                    <ul className="text-sm space-y-1">
                        <li>123 Avenue Road</li>
                        <li>Singapore, 123456</li>
                        <li>Singapore</li>
                        <li className="flex items-center gap-2 mt-2">
                            <MdEmail className="text-lg text-grey-400" />
                            <a href="mailto:pacificmarketinsight@gmail.com" className="hover:underline">
                                parknowsupport@gmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <AiOutlineLinkedin className="text-lg text-grey-400" />
                            <a href="https://linkedin.com" target="_blank" className="hover:underline">
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>


                <div className="text-sm text-center md:text-left">
                    <p className="mb-2">&copy; 2025 ParkNow. All rights reserved.</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;