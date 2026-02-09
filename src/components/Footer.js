import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUp, FiArrowRight } from 'react-icons/fi';
import { naijaStaysData } from '../data/naijaStaysData';

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-white border-t border-zinc-100 pt-32 pb-12">
      <div className="container mx-auto px-6">
        
        {/* TOP SECTION: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-6">
            <h2 className="text-4xl font-extralight tracking-tighter text-zinc-900 mb-8 ">
              SAKARI<span className=" ml-1 text-zinc-400">HOMES</span>
            </h2>
            <p className="max-w-md text-sm text-zinc-500 leading-relaxed font-light">
              A private beachfront retreat designed for rest, privacy,
              and refined coastal living along Nigeria’s shoreline. 
              Redefining the standard of luxury stays through architectural 
              clarity and intentional hospitality.
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-8 font-bold">
              Journal & Updates
            </p>
            <form className="group relative">
              <input
                type="email"
                placeholder="Join our private list"
                className="w-full bg-transparent border-b border-zinc-200 py-4 text-sm font-light focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-300"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 group-hover:translate-x-1 transition-transform"
              >
                <FiArrowRight className="text-zinc-400 group-hover:text-zinc-900" />
              </button>
            </form>
            <p className="mt-4 text-[10px] text-zinc-300 italic">No noise. Only seasonal exclusives.</p>
          </div>
        </div>

        {/* MIDDLE SECTION: NAV & CONTACT */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-32 border-t border-zinc-50 pt-16">
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-900 font-bold mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4 text-xs tracking-widest text-zinc-500 uppercase">
              <li><Link to="/properties" className="hover:text-zinc-900 transition-colors">Residences</Link></li>
              <li><Link to="/#amenities" className="hover:text-zinc-900 transition-colors">Amenities</Link></li>
              <li><Link to="/#gallery" className="hover:text-zinc-900 transition-colors">Gallery</Link></li>
              <li><Link to="/concierge" className="hover:text-zinc-900 transition-colors">Concierge</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-900 font-bold mb-8">Connect</h4>
            <ul className="flex flex-col gap-4 text-xs tracking-widest text-zinc-500 uppercase font-medium">
              <li><a href={naijaStaysData.socialLinks.instagram} className="hover:text-zinc-900 transition-colors">Instagram</a></li>
              <li><a href={naijaStaysData.socialLinks.twitter} className="hover:text-zinc-900 transition-colors">Twitter</a></li>
              <li><a href={naijaStaysData.socialLinks.facebook} className="hover:text-zinc-900 transition-colors">Facebook</a></li>
            </ul>
          </div>

          <div className="lg:col-span-6 lg:text-right">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-900 font-bold mb-8">Inquiries</h4>
            <p className="text-xl font-extralight text-zinc-600 mb-2">{naijaStaysData.contact.email}</p>
            <p className="text-sm font-light text-zinc-400">{naijaStaysData.contact.address}</p>
          </div>
        </div>

        {/* BOTTOM SECTION: LEGAL & TOP */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-zinc-100">
          <div className="order-2 md:order-1">
            <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400">
              © {year} sakari homes — <span className="italic">Elevated Living</span>
            </p>
          </div>

          <div className="flex gap-12 order-3 md:order-2">
            <Link to="/privacy" className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors font-bold">Privacy</Link>
            <Link to="/terms" className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors font-bold">Terms</Link>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-4 order-1 md:order-3 text-[10px] uppercase tracking-[0.3em] text-zinc-900 font-bold"
          >
            Top <div className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all"><FiArrowUp /></div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;