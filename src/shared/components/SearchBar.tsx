import { useEffect, useState, useRef, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSuggestions } from "../../gifs/actions/get-suggestions.action";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar...", onQuery }: Props) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length >= 2) {
        const results = await getSuggestions(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Original delayed search execution
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim() && !isFocused) {
        onQuery(query);
      }
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [query, onQuery, isFocused]);

  const handleSearch = (term: string = query) => {
    if (term.trim()) {
      onQuery(term);
      setQuery('');
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = isFocused && suggestions.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col sm:flex-row items-start justify-center gap-4 w-full max-w-2xl mx-auto px-4 py-6"
    >
      <div className="relative w-full group" ref={dropdownRef}>
        <input 
          type="text" 
          placeholder={placeholder} 
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          className={`relative w-full neo-glass-pill z-20 text-white placeholder-slate-400 text-lg px-8 py-4 outline-none transition-all duration-300 ${isFocused ? 'ring-1 ring-neo-cyan/50 shadow-[0_0_20px_rgba(0,229,255,0.2)]' : 'border border-transparent'}`}
        />
        
        {/* Modern Search Icon inside input */}
        <div className="absolute right-6 top-6 -translate-y-1/2 opacity-50 z-20 pointer-events-none">
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Suggestion Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-12 left-0 w-full pt-6 pb-2 px-2 bg-neo-bg/95 backdrop-blur-2xl border border-neo-blue/20 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] z-10"
            >
              <ul className="flex flex-col gap-1 mt-2">
                {suggestions.map((suggestion, idx) => (
                  <motion.li 
                    key={suggestion}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSearch(suggestion)}
                    className="px-6 py-3 cursor-pointer text-slate-300 hover:text-white hover:bg-neo-blue/20 rounded-xl transition-colors flex items-center gap-3"
                  >
                    <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <span className="font-medium text-[1.05rem]">{suggestion}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button 
        onClick={() => handleSearch(query)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto h-[60px] px-8 neo-button-active whitespace-nowrap"
      >
        Buscar
      </motion.button>
    </motion.div>
  )
}
