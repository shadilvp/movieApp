import React, { useState } from "react";
import { InputWithButton } from "../Components/ui/InputButton";
import { Button } from "../Components/ui/button";
import axios from "axios";
import MovieCard from "../Components/ui/MovieCard";
import { ButtonDestructive } from "../Components/ui/DestractiveButton";
import AddMovieForm from "../Components/AddMovie";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../services/movieService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface MovieData {
  title: string;
  poster: string;
  type: string;
  director: string;
  runtime: string;
  location: string;
  year: string;
}

const AddMovie: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [formData, setFormData] = useState<MovieData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSearch = async (movieTitle: string) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?t=${movieTitle}&apikey=82b61085`
      );

      if (res.data.Response === "False") {
        setFormData(null);
        setErrorMessage("No movie found with that title.");
        return;
      }

      const movie: MovieData = {
        title: res.data.Title,
        poster: res.data.Poster,
        type: res.data.Type,
        director: res.data.Director,
        runtime: res.data.Runtime,
        location: res.data.Country,
        year: res.data.Year,
      };

      setFormData(movie);
      setErrorMessage("");
      setSearchText("");
    } catch (err) {
      console.error("Error fetching movie:", err);
      setFormData(null);
      setErrorMessage("An error occurred while fetching movie data.");
    }
  };

  const mutation = useMutation({
    mutationFn: addMovie,
    onSuccess: (Response) => {
      toast.success(Response.message || "Movie added successfully!");
      setFormData(null);
    },
    onError: (error) => {
      console.log("error adding movie", error);
      toast.error("Error adding movie:");
    },
  });

  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  return (
    <section className="w-screen min-h-screen flex flex-col gap-20 justify-center items-center bg-black px-4">
      <div className="w-full mt-4">
        <Button
          onClick={() => navigate("/")}
          className="text-white text-sm px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          ←
        </Button>
      </div>
      <div>
        <div className="space-y-4 flex flex-col items-center justify-center">
          <h2 className="text-[#d7d5d5] text-xl font-semibold">
            Search For Movies
          </h2>
          <InputWithButton
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
          />
        </div>

        {errorMessage && (
          <p className="text-red-400 mt-6 text-lg">{errorMessage}</p>
        )}

        {formData && (
          <div className="md:mt-5 flex flex-col justify-center items-center gap-4">
            <MovieCard
              title={formData.title}
              poster={formData.poster}
              type={formData.type}
              director={formData.director}
              runtime={formData.runtime}
              year={formData.year}
            />
            <div className="flex justify-center gap-3 md:mt-5">
              <ButtonDestructive onClick={() => setFormData(null)} />
              <Button
                className="bg-gray-800 text-white"
                onClick={async () => {
                  if (!formData) return;

                  const posterFile = formData.poster
                    ? await urlToFile(formData.poster, "poster.jpg")
                    : null;

                  mutation.mutate({
                    title: formData.title,
                    type: formData.type,
                    director: formData.director || "Unknown",
                    budget: "0",
                    location: formData.location || "Unknown",
                    runtime: formData.runtime,
                    year: formData.year,
                    posterFile,
                  });
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4 flex flex-col items-center justify-center">
        <h2 className="text-[#d7d5d5] text-xl font-semibold">
          Add Movies Manually
        </h2>
        <AddMovieForm
          onSubmit={(movieData) => {
            mutation.mutate(movieData);
          }}
        />
      </div>
    </section>
  );
};

export default AddMovie;
