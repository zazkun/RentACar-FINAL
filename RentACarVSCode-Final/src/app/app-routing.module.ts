import { KiralamaComponent } from './components/kiralama/kiralama.component';
import { AraclisteleComponent } from './components/araclistele/araclistele.component';
import { KiralaComponent } from './components/dialogs/kirala/kirala.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { AracComponent } from './components/arac/arac.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"arac",
    component:AracComponent
  },
  {
    path:"kategori",
    component:KategoriComponent
  },
  {
    path:"araclistele/:aracId",
    component:AraclisteleComponent
  },
  {
    path:"kiralama",
    component:KiralamaComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
