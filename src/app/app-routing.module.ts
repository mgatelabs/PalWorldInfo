import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyPalsComponent } from './my-pals/my-pals.component';
import { ParentsComponent } from './parents/parents.component';
import { CanBreedComponent } from './can-breed/can-breed.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'mypals', component: MyPalsComponent },
  { path: 'parents', component: ParentsComponent },
  { path: 'canbreed', component: CanBreedComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
