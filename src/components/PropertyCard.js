import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiArrowRight, FiUsers, FiHome, FiWifi } from 'react-icons/fi';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(price);

  return (
    <Link to={`/property/${property.slug}`} className="group block w-full">
      <article className="relative bg-white border border-zinc-100 transition-all duration-500 hover:border-zinc-300">
        
        {/* 1. IMAGE SECTION */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.name}
            className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          />
          
          {/* Price Badge - Floating & Elegant */}
          <div className="absolute bottom-0 left-0 bg-zinc-950 text-white p-5">
             <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Nightly Rate</p>
             <p className="text-lg font-light tracking-tight">{formatPrice(property.price)}</p>
          </div>

          {/* City Badge */}
          <div className="absolute top-5 right-5">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-900">
              {property.city}
            </span>
          </div>
        </div>

        {/* 2. CONTENT SECTION */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-extralight tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors">
                {property.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-2">
                <FiMapPin size={12} />
                <span className="uppercase tracking-wider">{property.location}</span>
              </div>
            </div>
          </div>

          {/* Detailed Description - Restored but refined */}
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-8 font-light italic">
            "{property.description}"
          </p>

          {/* Restored Amenities - Styled as a "spec sheet" */}
          <div className="flex items-center gap-8 py-6 border-y border-zinc-50 mb-8">
            <div className="flex items-center gap-2">
              <FiHome className="text-zinc-300" />
              <span className="text-[11px] uppercase tracking-tighter text-zinc-600 font-medium">
                {property.bedrooms} Bedrooms
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiUsers className="text-zinc-300" />
              <span className="text-[11px] uppercase tracking-tighter text-zinc-600 font-medium">
                {property.maxGuests} Guests
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiWifi className="text-zinc-300" />
              <span className="text-[11px] uppercase tracking-tighter text-zinc-600 font-medium">
                Fast Wi-Fi
              </span>
            </div>
          </div>

          {/* Footer / CTA */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-900">
              View Residence
            </span>
            <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500">
              <FiArrowRight />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PropertyCard;