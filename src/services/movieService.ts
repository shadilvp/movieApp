import axiosInstance from "../utils/axiosInstance";

export interface Movie {
  id: number;
  title: string;
  posterFile: File | null;
  type: string;
  director: string;
  budget: number;
  location: string;
  runtime: number;
  year: number;
}

export const addMovie = async (movie: any) => {
  const formData = new FormData();

  formData.append("title", movie.title);
  formData.append("type", movie.type);
  formData.append("director", movie.director);
  formData.append("budget", String(movie.budget));
  formData.append("location", movie.location);
  formData.append("runtime", movie.duration); 
  formData.append("year", String(movie.year));

  if (movie.posterFile) {
    formData.append("image", movie.posterFile);
  }

  const response = await axiosInstance.post("/movies/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const getMovies = async () => {
  const response = await axiosInstance.get('/movies/');
  return response.data
}

export const getMovie = async (id:number) => {
  const response = await axiosInstance.get(`/movies/${id}`);
  return response.data
}


export const deleteMovie = async (id:number) => {
  const response = await axiosInstance.delete(`/movies/${id}`);
  return response.data
}

export const updateMovie = async (id: number, updatedData: Partial<Movie>) => {
  const res = await axiosInstance.put(`/movies/${id}`, updatedData);
  return res.data;
};
