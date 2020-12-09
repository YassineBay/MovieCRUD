import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/Models/Movie";
import { Rent } from "src/app/Models/Rent";
import { User } from "src/app/Models/User";
import { MovieService } from "src/app/Shared/movie.service";
import { NotificationService } from "src/app/Shared/notification.service";
import { RentService } from "../Shared/rent.service";

@Component({
  selector: "app-user-rents",
  templateUrl: "./user-rents.component.html",
  styleUrls: ["./user-rents.component.css"],
})
export class UserRentsComponent implements OnInit {
  userRentsList: Rent[] = [];
  LoggedInuser: User;
  movie: Movie;

  constructor(
    private _rentService: RentService,
    private _notifService: NotificationService,
    private _movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.LoggedInuser = JSON.parse(localStorage.getItem("User"));
    this._rentService.getAllRents().subscribe((result) => {
      result.forEach((rent) => {
        if (
          this.LoggedInuser[0] != null &&
          rent.user.id == this.LoggedInuser[0].id
        ) {
          this.userRentsList.push(rent);
        }
      });
    });
  }

  returnMovie = (rent: Rent) => {
    if (confirm("Are You Sure You want to return this movie ?")) {
      let movieId = rent.movie.id;
      this._movieService.getMovieById(movieId).subscribe((result) => {
        this.movie = result;
        this.movie.numberInStock++;
        this._movieService.updateMovie(this.movie, this.movie.id).subscribe();
      });
      this._rentService.returnRentedMovie(rent.id).subscribe(() => {
        this._rentService.getAllRents().subscribe((result) => {
          this.userRentsList = result;
        });
        this._notifService.showSuccess(
          "You have Returned the movie",
          "Success"
        );
      });
    }
  };
}
