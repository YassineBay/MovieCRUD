import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../Models/Movie';
import { MovieService } from '../Shared/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie :Movie ;
  currentMovie :Movie ;
  moviesList : Movie[] ;
  formGroup : FormGroup;

  constructor(private ms:MovieService) {
    //FormGroup Initialization
    this.formGroup = new FormGroup({
        name: new FormControl("",[Validators.required,Validators.maxLength(20)]),
        genre:new FormControl("",[Validators.required,Validators.maxLength(10)])
    });
   }
   //Getting FormGroup Attributes for Validation
   get name() {return this.formGroup.get("name")}
   get genre() {return this.formGroup.get("genre")}


  ngOnInit(): void {
    //Initializing Movies List
    this.ms.getAllMovies().subscribe(result => this.moviesList = result);
  }

  //Init Movie For @Input
  initMovie =(movie) =>{
    this.currentMovie = movie;
  }

  //Add Movie
  addMovie = () =>{
    this.movie = this.formGroup.value;
    this.movie.isRented = false;
    this.ms.addMovie(this.movie).subscribe(()=>{
      this.ms.getAllMovies().subscribe(result => this.moviesList = result);
      this.formGroup.reset();
    })
  }

  //Delete Movie
  delete = (id:number) =>{
    if(confirm("Are you sure you want to delete this movie ")){
this.ms.deleteMovie(id).subscribe(()=>{
  this.ms.getAllMovies().subscribe(result => this.moviesList = result);
});
}
  }

  updateMovie = ($event) =>{
    this.movie = $event;
    console.log(this.movie.id);
    this.ms.updateMovie(this.movie,this.movie.id).subscribe(()=>{
      this.ms.getAllMovies().subscribe(result => this.moviesList = result);
    })
  }

}
