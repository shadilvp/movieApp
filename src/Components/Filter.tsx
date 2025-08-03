import { Input } from "./ui/input";

interface FilterBoxProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  directorFilter: string;
  setDirectorFilter: (value: string) => void;
  movies: any[] | undefined;
  onClear: () => void;
}

const FilterBox = ({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  yearFilter,
  setYearFilter,
  directorFilter,
  setDirectorFilter,
  movies,
  onClear,
}: FilterBoxProps) => {
  return (
    <div className="absolute right-0 mt-2 w-60 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-3 z-10 space-y-3">
      <Input
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-white"
      />

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="w-full bg-gray-800 text-white p-2 rounded text-sm"
      >
        <option value="">All Types</option>
        <option value="Movie">Movie</option>
        <option value="Series">Series</option>
        <option value="Anime">Anime</option>
      </select>

      <select
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
        className="w-full bg-gray-800 text-white p-2 rounded text-sm"
      >
        <option value="">All Years</option>
        {movies
          ?.map((m) => m.year)
          .filter((y, i, arr) => arr.indexOf(y) === i)
          .sort((a, b) => b - a)
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>

      <select
        value={directorFilter}
        onChange={(e) => setDirectorFilter(e.target.value)}
        className="w-full bg-gray-800 text-white p-2 rounded text-sm"
      >
        <option value="">All Directors</option>
        {movies
          ?.map((m) => m.director)
          .filter((d, i, arr) => arr.indexOf(d) === i)
          .map((director) => (
            <option key={director} value={director}>
              {director}
            </option>
          ))}
      </select>

      <button
        onClick={onClear}
        className="w-full mt-1 bg-black  text-[#d90000] py-1 rounded text-sm transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBox;
