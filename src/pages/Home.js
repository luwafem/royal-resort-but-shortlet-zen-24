import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/ShareButtons';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { naijaStaysData } from '../data/naijaStaysData';
import { FiWifi, FiShield, FiZap, FiHome, FiArrowRight } from 'react-icons/fi';

const heroSlides = [
  {
    image: 'https://unsplash.com/photos/b_79nOqf95I/download?force=true&w=2400',
    title: 'Luxury Shortlet Living',
    subtitle: 'Curated premium stays across Nigeria'
  },
  {
    image: 'https://unsplash.com/photos/MXbM1NrRqtI/download?force=true&w=2400',
    title: 'Designed for Comfort',
    subtitle: 'Refined apartments in prime city locations'
  },
  {
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    title: 'Stay Beautifully',
    subtitle: 'Where design meets everyday living'
  }
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const featured = useMemo(() => 
    naijaStaysData.properties.filter(p => p.featured), 
  []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const whatsappMsg = encodeURIComponent("Hello mex apartments 👋\n\nI’d like help booking a premium shortlet.");

  return (
    <div className="bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <SEO {...naijaStaysData.seo} />

      {/* ================= HERO SECTION ================ */}
      <section className="relative h-screen w-full overflow-hidden bg-zinc-900">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide}
            src={heroSlides[activeSlide]?.image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-4xl">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="uppercase tracking-[0.6em] text-[10px] text-white/90 mb-6 font-bold"
            >
              Elevated Living by SAKARI HOMES
            </motion.p>

            <motion.h1 
              key={`title-${activeSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-9xl font-extralight text-white leading-[0.95] mb-10 tracking-tighter"
            >
              {heroSlides[activeSlide]?.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "font-serif italic block md:inline" : ""}>{word} </span>
              ))}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8"
            >
              <Link to="/properties" className="group flex items-center gap-6 text-white">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Browse Collection</span>
                <span className="h-px w-12 bg-white/40 group-hover:w-20 transition-all duration-500" />
              </Link>
              
              <a 
                href={`https://wa.me/${naijaStaysData.contact.whatsapp}?text=${whatsappMsg}`}
                className="text-white/60 hover:text-white transition-colors text-[10px] uppercase tracking-[0.3em] font-bold"
              >
                Inquire Now
              </a>
            </motion.div>
          </div>
        </div>

        {/* REFINED SLIDE INDICATORS */}
        <div className="absolute bottom-12 right-6 z-20 flex flex-col gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-1 transition-all duration-700 ${i === activeSlide ? 'h-12 bg-white' : 'h-4 bg-white/20'}`}
            />
          ))}
        </div>
      </section>

      {/* ================= MINIMALIST TRUST STRIP (No Card) ================= */}
      <div className="bg-white border-b border-zinc-100">
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
            {[
              { label: 'Fully Serviced', desc: 'Hotel-grade care', icon: '01' },
              { label: 'Prime Locations', desc: 'The heart of city', icon: '02' },
              { label: '24/7 Support', desc: 'Always available', icon: '03' },
              { label: 'Secure Stays', desc: 'Your peace of mind', icon: '04' }
            ].map((item, i) => (
              <div key={i} className="group cursor-default">
                <span className="text-[10px] font-bold text-zinc-300 group-hover:text-zinc-900 transition-colors duration-500 block mb-4 tracking-widest">
                  {item.icon}
                </span>
                <h3 className="text-zinc-900 text-xs uppercase tracking-[0.2em] font-bold mb-2">
                  {item.label}
                </h3>
                <p className="text-zinc-400 text-xs font-light tracking-wide">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FEATURED PORTFOLIO ================= */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-24">
            <div className="max-w-xl">
              <span className="text-zinc-400 text-[10px] mb-4 block uppercase tracking-[0.4em] font-bold">The Selection</span>
              <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter text-zinc-900 leading-none">
                Featured <span className="italic">Portfolio</span>
              </h2>
            </div>
            <Link to="/properties" className="mt-8 md:mt-0 group flex items-center gap-4 text-zinc-400 hover:text-zinc-900 transition-colors">
               <span className="text-[10px] uppercase tracking-[0.2em] font-bold">View All</span>
               <FiArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-12 gap-y-24 gap-x-12">
            {featured.map((property, idx) => (
              <motion.div 
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`${idx % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-48'}`}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODERN CTA ================= */}
      <section className="py-40 bg-zinc-900 text-white relative">
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold mb-10 block">Concierge</span>
            <h2 className="text-5xl md:text-8xl font-extralight mb-16 leading-tight tracking-tighter">
              Ready for a <br />
              <span className="italic font-serif">bespoke</span> experience?
            </h2>
            <a
              href={`https://wa.me/${naijaStaysData.contact.whatsapp}?text=${whatsappMsg}`}
              className="inline-block border border-white/20 px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-zinc-900 transition-all duration-500"
            >
              Start Conversation
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;