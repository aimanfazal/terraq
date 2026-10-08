import { Search, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { callBackend } from "@/lib/call-backend";

interface SearchBarProps {
  onSearch: (query: string) => void;
  /** @deprecated no longer required; geocoding goes through the mapbox-geocode edge function */
  mapToken?: string;
  onLocationSelect?: (lng: number, lat: number, name: string) => void;
}

interface GeocodingResult {
  id: string;
  place_name: string;
  center: [number, number];
}

const SearchBar = ({ onSearch, onLocationSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const geocode = async (text: string) => {
    if (text.length < 2) {
      setResults([]);
      return;
    }
    try {
      const { data } = await callBackend("mapbox-geocode", { mode: "forward", query: text, limit: 4 });
      setResults(((data?.features as GeocodingResult[]) || []).slice(0, 4));
      setShowResults(true);
    } catch {
      setResults([]);
    }
  };

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => geocode(value), 300);
  };

  const handleSelect = (result: GeocodingResult) => {
    setQuery(result.place_name);
    setShowResults(false);
    onLocationSelect?.(result.center[0], result.center[1], result.place_name);
  };

  return (
    <div className="relative z-10" ref={containerRef}>
      <div className="relative opacity-85">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => { setIsFocused(true); results.length > 0 && setShowResults(true); }}
          onBlur={() => setIsFocused(false)}
          className="w-72 backdrop-blur-sm border border-border rounded-full px-4 py-2.5 pr-20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          style={{ backgroundColor: "#041009" }} />

        {isFocused ? (
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        ) : (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-medium text-muted-foreground border border-border/60" style={{ backgroundColor: "#041009" }}>Ctrl</kbd>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-medium text-muted-foreground border border-border/60" style={{ backgroundColor: "#041009" }}>K</kbd>
          </div>
        )}
      </div>

      {showResults && results.length > 0 &&
      <div className="absolute top-full mt-1 w-72 rounded-lg border border-border overflow-hidden shadow-xl opacity-90" style={{ backgroundColor: "#041009" }}>
          {results.map((r) =>
        <button
          key={r.id}
          onClick={() => handleSelect(r)}
          className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors border-b border-border last:border-0 flex items-center gap-2.5 opacity-100">

              <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{r.place_name}</span>
            </button>
        )}
        </div>
      }
    </div>);

};

export default SearchBar;
