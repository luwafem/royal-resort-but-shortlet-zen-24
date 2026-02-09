import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/ShareButtons';
import Footer from '../components/Footer';
import { naijaStaysData } from '../data/naijaStaysData';
import {
  FiMapPin, FiUsers, FiHome, FiChevronLeft, FiChevronRight,
  FiX, FiMessageSquare, FiCheck, FiShield, FiArrowRight
} from 'react-icons/fi';

const PropertyDetails = () => {
  const { slug } = useParams();
  const property = naijaStaysData.properties.find(p => p.slug === slug);

  const [imageIndex, setImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(1);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 1);
    }
  }, [checkIn, checkOut]);

  if (!property) return <div className="py-40 text-center font-light tracking-widest uppercase text-zinc-400">Residence Not Found</div>;

  const formatPrice = (n) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(n);

  const SERVICE_FEE = 75000;
  const total = (property.price * nights) + SERVICE_FEE;

  const whatsappMessage = encodeURIComponent(
    `Hello mex apartments 👋\n\nI’m interested in booking:\n${property.name}\n\n📅 ${checkIn || 'Flexible'} to ${checkOut || 'Flexible'}\n👥 Guests: ${guests}\n\nEstimated total: ${formatPrice(total)}`
  );

  return (
    <div className="bg-white selection:bg-zinc-900 selection:text-white">
      <SEO
        title={`${property.name} | MEX APARTMENTS`}
        description={property.description}
        image={property.images[0]}
      />

      {/* HERO SECTION - Architectural Scale */}
      <section className="relative h-[85vh] overflow-hidden bg-zinc-900">
        <img
          src={property.images[imageIndex]}
          alt={property.name}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        
        {/* Aesthetic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-20 left-0 right-0">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/60 mb-4 block font-bold">
                {property.city} / {property.location}
              </span>
              <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tighter mb-8 leading-[0.9]">
                {property.name}
              </h1>
              <div className="flex gap-12 text-white/80 border-t border-white/10 pt-8 mt-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest opacity-50">Space</span>
                  <span className="text-sm font-light">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest opacity-50">Capacity</span>
                  <span className="text-sm font-light">{property.maxGuests} Guests</span>
                </div>
                <button 
                  onClick={() => setShowLightbox(true)}
                  className="ml-auto self-end text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/30 pb-1 hover:border-white transition-colors"
                >
                  View Archive ({property.images.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="container mx-auto px-6 py-32 grid lg:grid-cols-12 gap-24">
        
        {/* LEFT: STORY & AMENITIES */}
        <div className="lg:col-span-7 space-y-32">
          
          {/* About */}
          <div className="max-w-2xl">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold mb-12">The Residence</h2>
            <p className="text-2xl font-extralight text-zinc-800 leading-relaxed italic mb-8">
              "{property.description}"
            </p>
          </div>

          {/* Highlights Spec-Sheet */}
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold mb-12">Property Highlights</h2>
            <div className="grid sm:grid-cols-2 gap-y-8 gap-x-12">
              {property.highlights.map((h, i) => (
                <div key={i} className="flex flex-col border-l border-zinc-100 pl-6 py-2">
                  <span className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Feature {i + 1}</span>
                  <span className="text-sm text-zinc-900 font-medium tracking-tight">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Amenities List */}
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold mb-12">Amenities & Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 text-[13px] text-zinc-500 tracking-tight">
              {property.amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: THE BOOKING STUDIO */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32 bg-white border border-zinc-100 p-10">
            <div className="mb-12 border-b border-zinc-50 pb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 block mb-2 font-bold">Nightly Investment</span>
              <div className="text-4xl font-extralight tracking-tighter text-zinc-900">
                {formatPrice(property.price)}
              </div>
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="group">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold group-focus-within:text-zinc-900 transition-colors">Arrival</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-200 py-3 text-sm font-light focus:outline-none focus:border-zinc-900 transition-colors cursor-pointer"
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold group-focus-within:text-zinc-900 transition-colors">Departure</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-200 py-3 text-sm font-light focus:outline-none focus:border-zinc-900 transition-colors cursor-pointer"
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold">Party Size</label>
                <select
                  value={guests}
                  onChange={e => setGuests(+e.target.value)}
                  className="w-full bg-transparent border-b border-zinc-200 py-3 text-sm font-light focus:outline-none focus:border-zinc-900 transition-colors appearance-none cursor-pointer"
                >
                  {[...Array(property.maxGuests)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mt-16 space-y-4">
              <div className="flex justify-between text-[11px] uppercase tracking-widest text-zinc-500">
                <span>Residence x {nights} nights</span>
                <span>{formatPrice(property.price * nights)}</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest text-zinc-500">
                <span>Service & Concierge</span>
                <span>{formatPrice(SERVICE_FEE)}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-100 pt-6 text-lg font-light tracking-tighter text-zinc-900">
                <span>Total Est.</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${naijaStaysData.contact.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 flex items-center justify-between w-full bg-zinc-950 text-white p-6 group hover:bg-zinc-800 transition-all"
            >
              <span className="text-xs uppercase tracking-[0.3em] font-bold">Request Reservation</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="mt-8 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-bold">
              <FiShield /> <span>Private Booking Protocol</span>
            </div>
          </div>
        </aside>
      </section>

      {/* LIGHTBOX: Kept immersive but simplified icons */}
      {showLightbox && (
        <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
          <button 
            onClick={() => setShowLightbox(false)} 
            className="absolute top-12 right-12 text-zinc-900 hover:rotate-90 transition-transform duration-500"
          >
            <FiX size={32} strokeWidth={1} />
          </button>

          <button
            onClick={() => setImageIndex(i => (i - 1 + property.images.length) % property.images.length)}
            className="absolute left-12 text-zinc-300 hover:text-zinc-900 transition-colors"
          >
            <FiChevronLeft size={60} strokeWidth={1} />
          </button>

          <div className="w-[80vw] h-[80vh]">
            <img
              src={property.images[imageIndex]}
              alt="Gallery"
              className="w-full h-full object-contain"
            />
          </div>

          <button
            onClick={() => setImageIndex(i => (i + 1) % property.images.length)}
            className="absolute right-12 text-zinc-300 hover:text-zinc-900 transition-colors"
          >
            <FiChevronRight size={60} strokeWidth={1} />
          </button>
          
          <div className="absolute bottom-12 text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-400">
            {imageIndex + 1} — {property.images.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PropertyDetails;