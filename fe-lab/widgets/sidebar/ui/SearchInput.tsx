import { forwardRef } from "react";
import SearchIcon from "@shared/ui/icons/SearchIcon";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ value, onChange }, ref) {
    return (
      <div className="px-3 py-2">
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted">
            <SearchIcon />
          </span>
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="토픽 검색... (/ 키로 포커스)"
            className="w-full font-mono text-[11px]
              bg-bg-deep border border-border-subtle rounded-md
              pl-8 pr-3 py-2 text-text-primary placeholder:text-text-muted
              outline-none transition-all duration-200
              focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer bg-transparent border-none text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  },
);

export default SearchInput;
