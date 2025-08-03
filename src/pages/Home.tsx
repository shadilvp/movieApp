import TextType from "../Components/ui/TypingText";
import { InfiniteSliderVertical } from "../Components/ui/InfiniteSlider";
import { MagneticBasic } from "../Components/ui/AddButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { deleteMovie, getMovies } from "../services/movieService";
import LoaderIcon from "../Components/ui/Loader";
import { Pencil, Trash2, Filter } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import FilterBox from "../Components/Filter";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserApiResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface Movie {
  id: number;
  title: string;
  poster: string | null;
  type: string;
  director: string;
  budget: number;
  location: string;
  duration: string;
  year: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface MovieApiResponse {
  success: boolean;
  message: string;
  data: Movie[];
}

const Home = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [directorFilter, setDirectorFilter] = useState("");

  const { data } = useQuery<UserApiResponse>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const {
    data: movies,
    isLoading: moviesLoading,
    error: movieError,
  } = useQuery<MovieApiResponse>({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteMovieMutate } = useMutation({
    mutationFn: deleteMovie,
    onSuccess: (response) => {
      toast.success(response.message || "Movie deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete movie");
    },
  });

  const handleEdit = (id: number) => {
    navigate(`/${id}`);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmDelete) {
      deleteMovieMutate(id);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setYearFilter("");
    setDirectorFilter("");
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#000] h-screen w-screen flex flex-col md:flex-row items-center justify-evenly px-0 py-0 gap-10">
        <div className="w-1/3 max-w-4xl flex flex-col items-center text-center space-y-6">
          <div className="text-white">
            <TextType
              text={[
                "Celebrate Stories That Move You",
                "Your Movie & Show Diary Starts Here",
                "Build Your Watchlist One Movie at a Time",
              ]}
              className="text-3xl md:text-5xl font-medium text-white"
              typingSpeed={75}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>

          {data?.data ? (
            <MagneticBasic />
          ) : (
            <p className="text-[#7dfc38] text-sm font-light">
              No user logged in. Please{" "}
              <Link
                to="/login"
                className="text-red-500 font-extralight underline hover:text-red-300"
              >
                Sign In
              </Link>{" "}
              to add a movie.
            </p>
          )}
        </div>

        <div className="relative w-1/2 flex">
          <div
            className="hidden md:block absolute bottom-94 left-0 w-full h-10 z-10 pointer-events-none"
            style={{ boxShadow: "0px -40px 40px 100px black" }}
          />
          <div className="basis-1/2">
            <InfiniteSliderVertical />
          </div>
          <div className="hidden md:block basis-1/2">
            <InfiniteSliderVertical />
          </div>
          <div
            className="hidden md:block absolute top-94 left-0 w-full h-3 z-10 pointer-events-none"
            style={{ boxShadow: "0px 20px 40px 100px black" }}
          />
        </div>
      </section>

      <section className="min-h-[50vh] w-full px-10 py-8 bg-[#000] text-white flex flex-col relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-yellow-400">
            🎬 My Movie Collection
          </h2>

          <div className="relative">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="text-white p-2 rounded-full hover:bg-gray-800 transition"
              title="Filter"
            >
              <Filter className="w-6 h-6" />
            </button>

            {showFilter && (
              <FilterBox
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                yearFilter={yearFilter}
                setYearFilter={setYearFilter}
                directorFilter={directorFilter}
                setDirectorFilter={setDirectorFilter}
                movies={movies?.data}
                onClear={handleClearFilters}
              />
            )}
          </div>
        </div>

        {moviesLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-16 h-16">
              <LoaderIcon />
            </div>
          </div>
        ) : movieError ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <h2 className="text-red-500 text-xl font-light">
              An error occurred while loading movies.
            </h2>
          </div>
        ) : movies?.data?.length === 0 ? (
          <p className="text-gray-400 italic">
            No movies added yet. Start building your collection!
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-sm md:text-base border border-gray-700 bg-[#1a1a1a]">
              <thead>
                <tr className="bg-[#252525] text-yellow-300">
                  <th className="p-3 border border-gray-700">Title</th>
                  <th className="p-3 border border-gray-700">Type</th>
                  <th className="p-3 border border-gray-700">Director</th>
                  <th className="p-3 border border-gray-700">Year</th>
                  <th className="p-3 border border-gray-700">Budget</th>
                  <th className="p-3 border border-gray-700">Duration</th>
                  <th className="p-3 border border-gray-700">Location</th>
                  <th className="p-3 border border-gray-700 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies?.data
                  .filter(
                    (movie) =>
                      movie.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                      (typeFilter === "" || movie.type === typeFilter) &&
                      (yearFilter === "" ||
                        movie.year === Number(yearFilter)) &&
                      (directorFilter === "" ||
                        movie.director === directorFilter)
                  )
                  .map((movie) => (
                    <tr
                      key={movie.id}
                      className="hover:bg-[#2d2d2d] transition-all duration-200"
                    >
                      <td className="p-3 border border-gray-700">
                        {movie.title}
                      </td>
                      <td className="p-3 border border-gray-700">
                        {movie.type}
                      </td>
                      <td className="p-3 border border-gray-700">
                        {movie.director}
                      </td>
                      <td className="p-3 border border-gray-700">
                        {movie.year}
                      </td>
                      <td className="p-3 border border-gray-700">
                        ${movie.budget}
                      </td>
                      <td className="p-3 border border-gray-700">
                        {movie.duration}
                      </td>
                      <td className="p-3 border border-gray-700">
                        {movie.location}
                      </td>
                      <td className="p-3 border border-gray-700 flex items-center justify-center gap-4 text-gray-300">
                        <button
                          onClick={() => handleEdit(movie.id)}
                          className="hover:text-blue-400 transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(movie.id)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
