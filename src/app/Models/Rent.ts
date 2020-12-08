import { Movie } from "./Movie";
import { User } from "./User";

export class Rent {
  id: number;
  name: string;
  lastname: string;
  rentTime: string;
  movie: Movie;
  user: User;
}
