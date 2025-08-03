import React from "react";
import type { Movie } from "../Types/movieTypes";
import BlurText from "./ui/TempBlurText";

type Props = {
  editForm: Movie;
  setEditForm: React.Dispatch<React.SetStateAction<Movie | null>>;
  onSave: () => void;
  isSaving: boolean;
};

const EditMovieForm = ({ editForm, setEditForm, onSave, isSaving }: Props) => {
  if (!editForm) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Movie
  ) => {
    const value =
      field === "budget" || field === "duration" || field === "year"
        ? +e.target.value
        : e.target.value;
    setEditForm({ ...editForm, [field]: value });
  };

  return (
    <div className="space-y-6 bg-gray-900 p-6 rounded-xl shadow-lg max-w-3xl mx-auto mt-8">
      <div className="flex justify-center w-full">
        <BlurText
          text="Edit The Movie"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-2xl mb-8 text-center"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="bg-gray-800 px-4 py-2 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={editForm.title}
          onChange={(e) => handleChange(e, "title")}
          placeholder="Title"
        />
        <input
          className="bg-gray-800 px-4 py-2 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={editForm.director}
          onChange={(e) => handleChange(e, "director")}
          placeholder="Director"
        />
        <input
          className="bg-gray-800 px-4 py-2 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={editForm.type}
          onChange={(e) => handleChange(e, "type")}
          placeholder="Type"
        />
        <input
          className="bg-gray-800 px-4 py-2 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="number"
          value={editForm.budget}
          onChange={(e) => handleChange(e, "budget")}
          placeholder="Budget"
        />
        <input
          className="bg-gray-800 px-4 py-2 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={editForm.location}
          onChange={(e) => handleChange(e, "location")}
          placeholder="Location"
        />
        <input
          className="bg-gray-800 px-4 py-2 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="number"
          value={editForm.duration}
          onChange={(e) => handleChange(e, "duration")}
          placeholder="Duration (mins)"
        />
      </div>

      <div className="mt-2">
        <input
          className="w-full bg-gray-800 px-4 py-2 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="number"
          value={editForm.year}
          onChange={(e) => handleChange(e, "year")}
          placeholder="Year"
        />
      </div>

      <div className="flex justify-center">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg shadow-md transition duration-300"
          onClick={() => {
            const confirmSave = window.confirm(
              "Are you sure you want to save the changes?"
            );
            if (confirmSave) {
              onSave();
            }
          }}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditMovieForm;
