import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { FrontmoviesComponent } from './frontmovies/frontmovies.component';
import { RentComponent } from './rent/rent.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FrontmoviesComponent, RentComponent],
  imports: [
    CommonModule,
    FrontRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FrontModule { }
