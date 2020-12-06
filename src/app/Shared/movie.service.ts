import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../Models/Movie";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private _http: HttpClient) {}
  url = "http://localhost:3000/movies/";

  getAllMovies = (): Observable<Movie[]> => {
    return this._http.get<Movie[]>(this.url);
  };

  getMovieById = (id: number): Observable<Movie> => {
    return this._http.get<Movie>(this.url + id);
  };

  addMovie = (movie: Movie): Observable<Movie> => {
    return this._http.post<Movie>(this.url, movie);
  };

  updateMovie = (movie: Movie, id: number): Observable<Movie> => {
    return this._http.put<Movie>(this.url + id, movie);
  };

  deleteMovie = (id: number): Observable<Movie> => {
    return this._http.delete<Movie>(this.url + id);
  };

  saveImage = (fd: FormData, selectedFile: File) => {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    fd.append("image", selectedFile, selectedFile.name);
    this._http
      .post("http://localhost/scripts/movieApp/saveImage.php", fd, {
        headers: headers,
      })
      .subscribe(() => {
        console.log("it worked");
      });
  };
}
