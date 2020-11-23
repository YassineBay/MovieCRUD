import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../Models/Movie';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {

  formGroup : FormGroup;
  @Input() movie : Movie;
  @Output() modifiedMovie = new EventEmitter<Movie>();

  constructor() { 
    //FormGroup Initialization
    this.formGroup = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.maxLength(20)]),
      genre:new FormControl("",[Validators.required,Validators.maxLength(10)])});
  }
  //Getting FormGroup Attributes for Validation
  get name() {return this.formGroup.get("name")}
  get genre() {return this.formGroup.get("genre")}


  ngOnInit(): void { }

  updateMovie = () =>{
   this.modifiedMovie.emit(this.movie);
  }

}
