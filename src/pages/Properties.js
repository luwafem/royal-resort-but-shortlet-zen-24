import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ShareButtons';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { naijaStaysData } from '../data/naijaStaysData';
import {
  FiSearch,
  FiFilter,
  FiX,
  FiChevronDown,
  FiMessageSquare,
  FiArrowRight
} from 'react-icons/fi';

const Properties = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [searchQuery, setSearchQuery] = useState('');
  const [bedrooms, setBedrooms] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const cities = naijaStaysData.cities;
  const allProperties = naijaStaysData.properties;

  const sortOptions = [
    { id: 'featured', name: 'Curated' },
    { id: 'price-low', name: 'Value: Low to High' },
    { id: 'price-high', name: 'Value: High to Low' },
    { id: 'bedrooms', name: 'Dimensions: Large' },
  ];

  const filteredProperties = useMemo(() => {
    let filtered = allProperties.filter(p => {
      if (selectedCity !== 'all' && p.city !== selectedCity) return false;
      if (selectedType !== 'all' && p.category !== selectedType) return false;
      if (p.price < priceRange.min || p.price > priceRange.max) return false;
      if (bedrooms > 0 && p.bedrooms < bedrooms) return false;
      if (
        searchQuery &&
        !`${p.name} ${p.location} ${p.city}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'bedrooms': filtered.sort((a, b) => b.bedrooms - a.bedrooms); break;
      default: filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return filtered;
  }, [selectedCity, selectedType, priceRange, bedrooms, searchQuery, sortBy]);

  return (
    <div className="bg-white min-h-screen selection:bg-zinc-900 selection:text-white">
      <SEO
        title="The Collection | NAVA CREST"
        description="Hand-picked premium shortlets across Nigeria’s finest locations"
        image={allProperties[0]?.images[0]}
      />

      {/* MINIMAL HERO */}
      <section className="relative pt-32 pb-20 border-b border-zinc-100">
        <div className="container mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 font-bold mb-4 block">
            The Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter text-zinc-900 mb-12">
            Signature <span className="italic">Stays.</span>
          </h1>

          {/* EDITORIAL SEARCH */}
          <div className="max-w-2xl relative group">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by city or residence name..."
              className="w-full bg-transparent border-b border-zinc-200 py-6 text-xl font-light focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-300"
            />
            <FiSearch className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" size={20} />
          </div>
        </div>
      </section>

      {/* FILTER BAR - STICKY GHOST EFFECT */}
      <section className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-zinc-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex gap-8">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <FiFilter className={isFilterOpen ? 'text-zinc-900' : ''} /> 
              {isFilterOpen ? 'Close Filters' : 'Filter Results'}
            </button>

            <div className="hidden md:flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-bold">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 focus:outline-none cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
            {filteredProperties.length} Properties Found
          </div>
        </div>

        {/* EXPANDABLE FILTER DRAWER */}
        {isFilterOpen && (
          <div className="bg-zinc-50 border-b border-zinc-100 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-12">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold block mb-4">Location</label>
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent border-b border-zinc-200 py-2 text-sm font-light focus:outline-none focus:border-zinc-900"
                >
                  <option value="all">All Locations</option>
                  {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold block mb-4">Bedrooms</label>
                <input
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={e => setBedrooms(+e.target.value)}
                  className="w-full bg-transparent border-b border-zinc-200 py-2 text-sm font-light focus:outline-none focus:border-zinc-900"
                  placeholder="Min. Bedrooms"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold block mb-4">Max Price (₦)</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={e => setPriceRange(p => ({ ...p, max: +e.target.value }))}
                  className="w-full bg-transparent border-b border-zinc-200 py-2 text-sm font-light focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCity('all');
                    setBedrooms(0);
                    setPriceRange({ min: 0, max: 1000000 });
                  }}
                  className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors underline underline-offset-8"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* RESULTS GRID */}
      <section className="container mx-auto px-6 py-24">
        {filteredProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredProperties.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-dashed border-zinc-100">
            <h3 className="text-xl font-light text-zinc-400 tracking-widest uppercase mb-8">No results in this category</h3>
            <button
              onClick={() => {
                setSelectedCity('all');
                setSearchQuery('');
              }}
              className="text-[10px] uppercase tracking-[0.3em] font-bold border border-zinc-900 px-8 py-4 hover:bg-zinc-900 hover:text-white transition-all"
            >
              View Full Collection
            </button>
          </div>
        )}
      </section>

      {/* WHATSAPP CTA BOX */}
      <section className="container mx-auto px-6 pb-32">
        <div className="bg-zinc-900 p-12 md:p-20 text-center flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold mb-6">Concierge</span>
          <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-tighter mb-10 max-w-2xl">
            Seeking something <span className="italic underline underline-offset-8 decoration-zinc-700">bespoke?</span>
          </h2>
          <a
            href={`https://wa.me/${naijaStaysData.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 text-white border border-white/20 px-10 py-5 hover:bg-white hover:text-zinc-900 transition-all"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Personal Inquiry</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;