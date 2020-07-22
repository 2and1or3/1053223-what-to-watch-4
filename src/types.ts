interface FilmType {
  id: number;
  title: string;
  preview: string;
  background: string;
  backgroundColor: string;
  cover: string;
  genre: string;
  isFavorite: boolean;
  src: string;
  release: string;
  description: string;
  poster: string;
  duration: number;
  rating: number;
  voiceCount: number;
  director: string;
  actors: string[];
}

interface CommentType {
  id: string;
  author: string;
  date: string;
  description: string;
  rate: string;
}

interface GenreType {
  id: string;
  title: string;
}

type RefType = () => void | {current: React.ReactNode};

export {FilmType, CommentType, RefType, GenreType};
