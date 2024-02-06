import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyPalsComponent } from './my-pals/my-pals.component';
import { ParentsComponent } from './parents/parents.component';
import { CanBreedComponent } from './can-breed/can-breed.component';
import { RelatedPalsComponent } from './related-pals/related-pals.component';

const routes: Routes = [
  { path: 'mypals', component: MyPalsComponent },
  { path: 'parents', component: ParentsComponent },
  { path: 'canbreed', component: CanBreedComponent },
  { path: 'relatedpals', component: RelatedPalsComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
