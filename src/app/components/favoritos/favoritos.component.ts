import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { PessoasService } from '../../services/pessoas.service';
import { Pessoa } from '../../interfaces/Pessoa';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})

export class FavoritosComponent implements OnInit{
  
  favoritos: Pessoa[] = [];

  constructor(private pessoasService: PessoasService) {}

  ngOnInit(): void {
    this.pessoasService.getPessoa().subscribe({
      next: data => {
        this.favoritos = data.filter(p => p.favorito);
      }
    });
  }

}