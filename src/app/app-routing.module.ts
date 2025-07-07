import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastradosComponent } from './components/cadastrados/cadastrados.component';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
 
const routes: Routes = [

  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'cadastrados', component: CadastradosComponent},
  {path: 'home', component: HomeComponent},
  {path: 'favoritos', component: FavoritosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
