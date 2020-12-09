import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "src/app/Models/Movie";
import { Rent } from "src/app/Models/Rent";
import { User } from "src/app/Models/User";
import { MovieService } from "src/app/Shared/movie.service";
import { RentService } from "../Shared/rent.service";
import { ViewChild } from "@angular/core";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepicker,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-rent",
  templateUrl: "./rent.component.html",
  styleUrls: ["./rent.component.css"],
})
export class RentComponent implements OnInit {
  movie: Movie;
  formGroup: FormGroup;
  rent: Rent;
  LoggedInuser: User;

  //datePicker variables

  model: NgbDateStruct;
  date: { year: number; month: number };
  @ViewChild("dp") dp: NgbDatepicker;

  constructor(
    private ar: ActivatedRoute,
    private ms: MovieService,
    private rs: RentService,
    private calendar: NgbCalendar
  ) {}

  ngOnInit(): void {
    this.LoggedInuser = JSON.parse(localStorage.getItem("User"));
    this.ms
      .getMovieById(this.ar.snapshot.params.id)
      .subscribe((result) => (this.movie = result));
    this.formGroup = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      //option: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
      ]),
    });
  }

  get name() {
    return this.formGroup.get("name");
  }

  get lastname() {
    return this.formGroup.get("lastname");
  }
  /*get option() {
    return this.formGroup.get("option");
  }*/

  addRent = () => {
    this.rent = this.formGroup.value;
    this.rent.returnDate = new Date(
      this.model.year + "-" + this.model.month + "-" + this.model.day
    );

    var startDate = new Date(Date.now());
    var endDate = new Date(this.rent.returnDate);
    console.log(endDate.getDay() - startDate.getDay());
    this.rent.rentTime = (startDate.getDay() - endDate.getDay()) * -1;

    this.rent.user = this.LoggedInuser[0];
    this.movie.numberInStock--;
    this.rent.movie = this.movie;
    this.rs.addRent(this.rent).subscribe(() => {
      this.movie.isRented = true;
      this.ms.updateMovie(this.movie, this.ar.snapshot.params.id).subscribe();
      alert("You Have Successfully rented a movie ");
      this.formGroup.reset();
    });
  };

  //#region DatePicker

  selectToday() {
    this.model = this.calendar.getToday();
  }

  setCurrent() {
    //Current Date
    this.dp.navigateTo();
  }
  setDate() {
    //Set specific date
    this.dp.navigateTo({ year: 2013, month: 2 });
  }

  navigateEvent(event) {
    this.date = event.next;
  }
  //#endregion
}
