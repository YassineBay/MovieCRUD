import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Movie } from "../Models/Movie";
import { MovieService } from "../Shared/movie.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"],
})
export class MovieComponent implements OnInit {
  movie: Movie;
  currentMovie: Movie;
  moviesList: Movie[];
  formGroup: FormGroup;
  imageSrc: string;
  selectedFile = null;

  //pagination
  p: number = 1;
  collection: Movie[] = [];

  constructor(private ms: MovieService) {
    //FormGroup Initialization
    this.formGroup = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      numberInStock: new FormControl("", [
        Validators.required,
        Validators.max(20),
        Validators.min(0),
      ]),
      genre: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
      ]),
      price: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9][0-9]*"),
      ]),
      file: new FormControl("", [Validators.required]),
      fileSource: new FormControl("", [Validators.required]),
    });
  }
  //Getting FormGroup Attributes for Validation
  get name() {
    return this.formGroup.get("name");
  }
  get numberInStock() {
    return this.formGroup.get("numberInStock");
  }
  get genre() {
    return this.formGroup.get("genre");
  }
  get price() {
    return this.formGroup.get("price");
  }
  get file() {
    return this.formGroup.get("file");
  }
  get fileSource() {
    return this.formGroup.get("fileSource");
  }

  ngOnInit(): void {
    //Initializing Movies List
    //this.ms.getAllMovies().subscribe((result) => (this.moviesList = result));
    this.ms.getAllMovies().subscribe((result) => (this.collection = result));
  }

  //Init Movie For @Input
  initMovie = (movie) => {
    this.currentMovie = movie;
  };

  //Add Movie
  addMovie = (event) => {
    //this.movie = this.formGroup.value;
    console.log(event);
    this.movie = {
      name: this.formGroup.get("name").value,
      genre: this.formGroup.get("name").value,
      price: this.formGroup.get("price").value,
      imageName: event.target[4].files[0].name,
      numberInStock: Number(this.formGroup.get("numberInStock").value),
      isRented: false,
    };
    /*this.movie.imageName = event.target[3].files[0].name;
    this.movie.isRented = false;*/
    this.ms.addMovie(this.movie).subscribe(() => {
      event.preventDefault();
      this.saveImageInLocal(event);
      this.ms.getAllMovies().subscribe((result) => (this.moviesList = result));
      this.formGroup.reset();
    });
  };

  //Delete Movie
  delete = (id: number) => {
    if (confirm("Are you sure you want to delete this movie ")) {
      this.ms.deleteMovie(id).subscribe(() => {
        this.ms
          .getAllMovies()
          .subscribe((result) => (this.moviesList = result));
        this.currentMovie = null;
      });
    }
  };

  updateMovie = ($event) => {
    this.movie = $event;
    console.log(this.movie.id);
    this.ms.updateMovie(this.movie, this.movie.id).subscribe(() => {
      this.ms.getAllMovies().subscribe((result) => (this.moviesList = result));
      this.currentMovie = null;
    });
  };

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.formGroup.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }

  saveImageInLocal = (event) => {
    this.selectedFile = <File>event.target[4].files[0];
    const fd = new FormData();
    this.ms.saveImage(fd, this.selectedFile);
  };
}
