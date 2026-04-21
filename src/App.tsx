import { useState, useMemo, useEffect } from "react";
import { Search, Ship, Globe, MapPin, Info, ArrowRight, ArrowLeft, Loader2, Heart, Home } from "lucide-react";
import { shippingAgents, ShippingAgent } from "./data/agents";
import AgentCard from "./components/AgentCard";
import AIAssistant from "./components/AIAssistant";
import { motion, AnimatePresence } from "motion/react";

const ITEMS_PER_PAGE = 10;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("shipagent_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem("shipagent_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (agentName: string) => {
    setFavorites(prev => 
      prev.includes(agentName) 
        ? prev.filter(name => name !== agentName) 
        : [...prev, agentName]
    );
  };

  const handleHome = () => {
    setSearchQuery("");
    setSelectedCountry("All");
    setSelectedTag("All");
    setShowOnlyFavorites(false);
    setHasSearched(false);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Extract unique cities and tags for filters
  const countries = ["All", "Nigeria", "Ghana"];
  const allTags = ["All", ...Array.from(new Set(shippingAgents.flatMap(a => a.tags)))];

  const filteredAgents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    const filtered = shippingAgents.filter((agent) => {
      const matchesSearch = 
        agent.name.toLowerCase().includes(query) ||
        agent.city.toLowerCase().includes(query) ||
        agent.country.toLowerCase().includes(query) ||
        agent.address.toLowerCase().includes(query) ||
        agent.tags.some(tag => tag.toLowerCase().includes(query));
      
      const matchesCountry = selectedCountry === "All" || agent.country === selectedCountry;
      const matchesTag = selectedTag === "All" || agent.tags.includes(selectedTag);
      const matchesFavorite = !showOnlyFavorites || favorites.includes(agent.name);

      return matchesSearch && matchesCountry && matchesTag && matchesFavorite;
    });

    // Sort to prioritize tag matches if query is not empty
    if (query) {
      return [...filtered].sort((a, b) => {
        const aHasTagMatch = a.tags.some(tag => tag.toLowerCase() === query);
        const bHasTagMatch = b.tags.some(tag => tag.toLowerCase() === query);
        
        if (aHasTagMatch && !bHasTagMatch) return -1;
        if (!aHasTagMatch && bHasTagMatch) return 1;
        return 0;
      });
    }

    return filtered;
  }, [searchQuery, selectedCountry, selectedTag, showOnlyFavorites, favorites]);

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);

    // Smart detection
    const lowerVal = val.toLowerCase();
    const hasNigeria = lowerVal.includes("nigeria") || lowerVal.includes("ng");
    const hasGhana = lowerVal.includes("ghana") || lowerVal.includes("gh");

    if (hasNigeria && hasGhana) {
      // If both are present, find which one appears first in the string
      const nigeriaIndex = Math.min(
        lowerVal.indexOf("nigeria") === -1 ? Infinity : lowerVal.indexOf("nigeria"),
        lowerVal.indexOf("ng") === -1 ? Infinity : lowerVal.indexOf("ng")
      );
      const ghanaIndex = Math.min(
        lowerVal.indexOf("ghana") === -1 ? Infinity : lowerVal.indexOf("ghana"),
        lowerVal.indexOf("gh") === -1 ? Infinity : lowerVal.indexOf("gh")
      );
      
      if (nigeriaIndex < ghanaIndex) setSelectedCountry("Nigeria");
      else setSelectedCountry("Ghana");
    } else if (hasNigeria) {
      setSelectedCountry("Nigeria");
    } else if (hasGhana) {
      setSelectedCountry("Ghana");
    } else if (lowerVal === "") {
      setSelectedCountry("All");
    }
    
    // Detect tags
    allTags.forEach(tag => {
      if (tag !== "All" && lowerVal.includes(tag.toLowerCase())) {
        setSelectedTag(tag);
      }
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setIsLoading(true);
    setCurrentPage(1);
    
    setTimeout(() => {
      setIsLoading(false);
      document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setHasSearched(true);
    setIsLoading(true);
    setCurrentPage(1);
    
    setTimeout(() => {
      setIsLoading(false);
      document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleHome}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="bg-[#E53935] p-1.5 rounded-lg">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                ShipAgent <span className="text-[#1E88E5]">Finder</span>
              </h1>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={handleHome} className="flex items-center gap-1 hover:text-[#E53935] transition-colors">
              <Home className="w-4 h-4" /> Home
            </button>
            <a href="#agents" className="hover:text-[#E53935] transition-colors">Find Agents</a>
            <a href="#how-it-works" className="hover:text-[#E53935] transition-colors">How it Works</a>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">100% FREE</span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-red-50/50 -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Find Verified Shipping Agents <br />
                <span className="text-[#E53935]">in Seconds</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Search the most reliable agents for China to Nigeria & Ghana shipping. 
                Verified contacts, real addresses, and fast delivery. No login required.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2 p-2 bg-white border-2 border-slate-200 rounded-3xl shadow-2xl focus-within:border-[#E53935] focus-within:ring-4 focus-within:ring-red-500/10 transition-all">
                {/* Country Dropdown */}
                <div className="relative flex items-center border-b sm:border-b-0 sm:border-r border-slate-100 px-4 py-2 sm:py-0">
                  <Globe className="h-5 w-5 text-slate-400 mr-2" />
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setSelectedCountry(val);
                      if (hasSearched) {
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 500);
                      }
                    }}
                    className="bg-transparent text-slate-900 font-bold text-sm focus:outline-none cursor-pointer pr-8 appearance-none"
                  >
                    {countries.map(c => (
                      <option key={c} value={c}>{c === "All" ? "All Countries" : c}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Keyword Search */}
                <div className="relative flex-1 flex items-center px-4 py-2 sm:py-0">
                  <Search className="h-5 w-5 text-slate-400 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Try 'shipping agent lagos' or 'fastest'..."
                    className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none py-3"
                  />
                  {isLoading && (
                    <div className="absolute right-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#E53935] rounded-full animate-ping" />
                      <Loader2 className="w-4 h-4 text-[#E53935] animate-spin" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-[#E53935] text-white rounded-2xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  Find Shipping Agent
                </button>
              </form>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl inline-block max-w-2xl mx-auto"
              >
                <p className="text-sm md:text-base text-blue-800 font-medium">
                  🚀 Do you want to learn how to import goods from China to Ghana using AI? 
                  <br className="hidden md:block" />
                  Join our <span className="font-bold">AI IMPORTATION COMMUNITY</span> at{" "}
                  <a 
                    href="https://www.turischool.com/aic" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#1E88E5] font-bold underline hover:text-blue-600 transition-colors"
                  >
                    www.turischool.com/aic
                  </a>
                </p>
              </motion.div>

              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
                <span>Popular:</span>
                {["Lagos", "Accra", "Fastest", "Cheapest"].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="hover:text-[#E53935] underline underline-offset-2"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Results */}
        {hasSearched && (
          <section id="agents" className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {/* Country Radio Group */}
                <div className="flex flex-col gap-2 min-w-max">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Country</span>
                  <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    {countries.map((country) => (
                      <label key={country} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="country-filter"
                          value={country}
                          checked={selectedCountry === country}
                          onChange={() => {
                            setSelectedCountry(country);
                            setCurrentPage(1);
                            if (hasSearched) {
                              setIsLoading(true);
                              setTimeout(() => setIsLoading(false), 500);
                            }
                          }}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedCountry === country 
                            ? "border-[#1E88E5] bg-[#1E88E5]" 
                            : "border-slate-300 bg-white group-hover:border-slate-400"
                        }`}>
                          {selectedCountry === country && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span className={`text-sm font-bold transition-colors ${
                          selectedCountry === country ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
                        }`}>
                          {country}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tag Filter Buttons */}
                <div className="flex flex-col gap-2 min-w-max">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Quick Filters</span>
                  <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button
                      onClick={() => {
                        setShowOnlyFavorites(!showOnlyFavorites);
                        setCurrentPage(1);
                        if (hasSearched) {
                          setIsLoading(true);
                          setTimeout(() => setIsLoading(false), 500);
                        }
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        showOnlyFavorites
                          ? "bg-pink-500 text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? "fill-current" : ""}`} />
                      Favorites ({favorites.length})
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1" />
                    {allTags.slice(0, 5).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => { 
                          setSelectedTag(tag); 
                          setCurrentPage(1);
                          if (hasSearched) {
                            setIsLoading(true);
                            setTimeout(() => setIsLoading(false), 500);
                          }
                        }}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                          selectedTag === tag
                            ? "bg-[#E53935] text-white shadow-md"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Showing <span className="text-slate-900 font-bold">{filteredAgents.length}</span> verified agents
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[400px]">
              {isLoading ? (
                <>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 backdrop-blur-sm z-10 rounded-3xl">
                    <Loader2 className="w-12 h-12 text-[#E53935] animate-spin mb-4" />
                    <p className="text-slate-600 font-bold animate-pulse">Finding the best agents for you...</p>
                  </div>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 opacity-50">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="h-6 w-48 bg-slate-200 rounded"></div>
                          <div className="h-4 w-32 bg-slate-100 rounded"></div>
                        </div>
                        <div className="h-5 w-16 bg-slate-100 rounded"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-12 bg-slate-50 rounded-lg"></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-4 bg-slate-100 rounded"></div>
                          <div className="h-4 bg-slate-100 rounded"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-10 bg-slate-200 rounded-lg"></div>
                        <div className="h-10 bg-slate-200 rounded-lg"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <AnimatePresence mode="popLayout">
                  {paginatedAgents.length > 0 ? (
                    paginatedAgents.map((agent) => (
                      <AgentCard 
                        key={agent.name} 
                        agent={agent} 
                        isFavorite={favorites.includes(agent.name)}
                        onToggleFavorite={() => toggleFavorite(agent.name)}
                      />
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200"
                    >
                      <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No agents found</h3>
                      <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                      <button 
                        onClick={() => { setSearchQuery(""); setSelectedCountry("All"); setSelectedTag("All"); }}
                        className="mt-6 text-[#E53935] font-bold hover:underline"
                      >
                        Clear all filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-50 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        currentPage === page
                          ? "bg-[#1E88E5] text-white shadow-md"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-50 hover:bg-slate-50 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>
        )}

        {/* Disclaimer & Footer */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 mb-12">
              <Info className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Safety Disclaimer</h4>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Always verify shipping agents by contacting them directly and visiting their office to avoid scams. 
                  ShipAgent Finder is a directory and does not handle payments or guarantee services. 
                  Always use secure payment methods and verify tracking numbers.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <Ship className="w-5 h-5 text-[#E53935]" />
                <span className="font-bold text-slate-900">ShipAgent Finder</span>
              </div>
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} ShipAgent Finder. Built for the African shipping community.
              </p>
              <div className="text-center md:text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Powered by TURISCHOOL</p>
                <p className="text-sm text-slate-600">
                  Get more free AI softwares and scripts visit{" "}
                  <a href="https://www.turischool.com/aitools" target="_blank" rel="noopener noreferrer" className="text-[#1E88E5] font-bold hover:underline">
                    www.turischool.com/aitools
                  </a>
                </p>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><Globe className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><MapPin className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AIAssistant />
    </div>
  );
}
