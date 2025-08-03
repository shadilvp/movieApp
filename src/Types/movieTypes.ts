export interface Movie {
  id: number;
  title: string;
  director: string;
  budget: number;
  location: string;
  duration: number;
  year: number;
  type: string;
  poster?: string;
}