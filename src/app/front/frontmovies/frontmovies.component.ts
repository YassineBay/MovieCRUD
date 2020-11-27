import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/Movie';
import { MovieService } from 'src/app/Shared/movie.service';

@Component({
  selector: 'app-frontmovies',
  templateUrl: './frontmovies.component.html',
  styleUrls: ['./frontmovies.component.css']
})
export class FrontmoviesComponent implements OnInit {

  moviesList:Movie[] = [];

  constructor(private ms:MovieService) { }

  ngOnInit(): void {
    this.ms.getAllMovies().subscribe(result => this.moviesList = result);
  }

}
