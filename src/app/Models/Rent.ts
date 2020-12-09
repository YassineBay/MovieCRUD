import { Movie } from "./Movie";
import { User } from "./User";

export class Rent {
  id: number;
  name: string;
  lastname: string;
  rentTime: number;
  movie: Movie;
  user: User;
  returnDate: Date;
}
