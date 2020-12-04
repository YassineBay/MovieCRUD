import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontmoviesComponent } from './frontmovies/frontmovies.component';
import { RentComponent } from './rent/rent.component';



const routes: Routes = [
  { path : "movies" , component: FrontmoviesComponent  },
  { path : "movies/rent/:id" , component: RentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
