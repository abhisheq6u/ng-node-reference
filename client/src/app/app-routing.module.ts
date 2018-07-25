import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { DetailsComponent } from './details/details.component';
import { LostComponent } from './lost/lost.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path:'products',  component: ProductsComponent
  },
  {path: 'products/:id', component: DetailsComponent},
  {path: 'register', component: FormComponent},
  {path: '**', component: LostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }