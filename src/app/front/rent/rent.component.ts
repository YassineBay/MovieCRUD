import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/Models/Movie';
import { Rent } from 'src/app/Models/Rent';
import { MovieService } from 'src/app/Shared/movie.service';
import { RentService } from '../Shared/rent.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  movie:Movie;
  formGroup : FormGroup;

  constructor(private ar:ActivatedRoute,
    private ms:MovieService,
    private rs:RentService) { }

  ngOnInit(): void {
    this.ms.getMovieById(this.ar.snapshot.params.id).subscribe(result => this.movie = result);
    this.formGroup = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.maxLength(20)]),
      option: new FormControl("",[Validators.required]),
      lastname:new FormControl("",[Validators.required,Validators.maxLength(10)])});
    }

  get name() {return this.formGroup.get("name")}
  get lastname() {return this.formGroup.get("lastname")}
  get option()  {return this.formGroup.get("option")}

  addRent = () =>{
    let rent = this.formGroup.value;
    this.rs.addRent(rent).subscribe(()=>{
      this.movie.isRented = true;
      this.ms.updateMovie(this.movie,this.ar.snapshot.params.id).subscribe();
      alert("You Have Successfully rented a movie ")
    }); 
  }

}
