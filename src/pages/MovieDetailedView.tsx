import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMovie, updateMovie } from "../services/movieService";
import type { Movie } from "../Types/movieTypes";
import LoaderIcon from "../Components/ui/Loader";
import toast from "react-hot-toast";
import EditMovieForm from "../Components/EditMovie";

const ViewMovie = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [editForm, setEditForm] = useState<Movie | null>(null);

  const {
    data: movieData,
    isLoading,
    error,
    refetch,
  } = useQuery<{ success: boolean; message: string; data: Movie }>({
    queryKey: ["getMovie", id],
    queryFn: () => getMovie(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (movieData?.data) {
      setEditForm(movieData.data);
    }
  }, [movieData]);

  const { mutate: saveMovie, isPending: isSaving } = useMutation({
    mutationFn: (updated: Partial<Movie>) => updateMovie(Number(id), updated),
    onSuccess: () => {
      toast.success(" Movie updated successfully!");
      setIsEdit(false);
      refetch();
    },
    onError: () => {
      toast.error(" Failed to update movie.");
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoaderIcon />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[300px] text-red-500">
        An error occurred while loading the movie.
      </div>
    );

  if (!movieData?.data)
    return (
      <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
        No movie data available
      </div>
    );

  return (
    <section className="h-full min-h-screen w-full bg-black text-white">
      <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-3xl font-bold text-yellow-400">
            🎬 {movieData.data.title}
          </h2>
          <div className="flex gap-3">
            <button className="bg-[#9ff415] text-black px-4 py-1 rounded hover:bg-[#bae27a]" onClick={() => navigate("/")}>
              Back
            </button>
            <button
              className="bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        {!isEdit ? (
          <>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <p>
                <span className="font-semibold text-purple-400">Director:</span>{" "}
                {movieData.data.director}
              </p>
              <p>
                <span className="font-semibold text-purple-400">Type:</span>{" "}
                {movieData.data.type}
              </p>
              <p>
                <span className="font-semibold text-purple-400">Budget:</span> $
                {movieData.data.budget}
              </p>
              <p>
                <span className="font-semibold text-purple-400">Location:</span>{" "}
                {movieData.data.location}
              </p>
              <p>
                <span className="font-semibold text-purple-400">Duration:</span>{" "}
                {movieData.data.duration} mins
              </p>
              <p>
                <span className="font-semibold text-purple-400">Year:</span>{" "}
                {movieData.data.year}
              </p>
            </div>
            <div className="flex justify-center mt-6">
              {movieData.data.poster && (
                <img
                  src={movieData.data.poster}
                  alt="Poster"
                  className="w-48 h-64 object-cover rounded-lg border border-gray-700"
                />
              )}
            </div>
          </>
        ) : (
          <EditMovieForm
            editForm={editForm!}
            setEditForm={setEditForm}
            onSave={() => editForm && saveMovie(editForm)}
            isSaving={isSaving}
          />
        )}
      </div>
    </section>
  );
};

export default ViewMovie;
