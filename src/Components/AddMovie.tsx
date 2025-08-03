import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ButtonDestructive } from "./ui/DestractiveButton";
import { GlowEffectCardBackground } from "./ui/GlowEffect";

export type MovieFormData = {
  title: string;
  type: "movie" | "tv";
  director: string;
  budget: number;
  location: string;
  runtime: number;
  year: number;
  posterFile: File | null;
};

type Props = {
  onSubmit: (data: MovieFormData) => void;
};

const AddMovieForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "movie" as "movie" | "tv",
    director: "",
    budget: "",
    location: "",
    runtime: "",
    year: "",
    posterFile: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, posterFile: file }));
  };

  const handleTypeChange = (value: "movie" | "tv") => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: formData.title,
      type: formData.type,
      director: formData.director,
      budget: parseInt(formData.budget) || 0,
      location: formData.location,
      runtime: parseInt(formData.runtime) || 0,
      year: parseInt(formData.year) || new Date().getFullYear(),
      posterFile: formData.posterFile,
    });
  };

  const clearForm = () =>
    setFormData({
      title: "",
      type: "movie",
      director: "",
      budget: "",
      location: "",
      runtime: "",
      year: "",
      posterFile: null,
    });

  return (
    <GlowEffectCardBackground>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="bg-gray-900 text-white placeholder-gray-400"
          />
          <Select value={formData.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="bg-gray-900 text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="tv">TV Show</SelectItem>
            </SelectContent>
          </Select>
          <Input
            name="director"
            value={formData.director}
            onChange={handleChange}
            placeholder="Director"
            className="bg-gray-900 text-white placeholder-gray-400"
          />
          <Input
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget"
            type="number"
            className="bg-gray-900 text-white placeholder-gray-400"
          />
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="bg-gray-900 text-white placeholder-gray-400"
          />
          <Input
            name="runtime"
            value={formData.runtime}
            onChange={handleChange}
            placeholder="Runtime"
            type="number"
            className="bg-gray-900 text-white placeholder-gray-400"
          />
        </div>

        <Input
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          type="number"
          className="bg-gray-900 text-white placeholder-gray-400"
        />

        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-gray-900 text-white placeholder-gray-400"
        />

        <div className="flex items-center justify-center gap-4">
          <ButtonDestructive onClick={clearForm} />
          <Button type="submit" className="bg-gray-800 text-white">
            Submit
          </Button>
        </div>
      </form>
    </GlowEffectCardBackground>
  );
};

export default AddMovieForm;
