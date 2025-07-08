import { Component, EventEmitter, Input, input, OnInit, Output, output } from '@angular/core';
import { Cadastro } from '../../cadastro';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { Pessoa } from '../../interfaces/Pessoa';
import { CategoryService } from '../../services/category.service';
import { PessoasService } from '../../services/pessoas.service';

@Component({
  selector: 'app-cadastrar',
  standalone: false,
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})

export class CadastrarComponent implements OnInit{

  categories : Category [] = [];

  cadastrados: Pessoa[] = [];

  @Input() cadastrado : Pessoa = {} as Pessoa;

  @Output() saveEmitter = new EventEmitter();

  @Input() isEditing: boolean = false;

  save(){
    this.saveEmitter.emit();
  }
    
  constructor(private categoryService: CategoryService, private pessoasService: PessoasService){
    
  }

  ngOnInit(): void {
    this.loadPessoa();
    this.loadCategories();
  }

  loadPessoa(){
    this.pessoasService.getPessoa().subscribe({next: data => {this.cadastrados = data}});
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe({next: data => {this.categories = data}});
  }


  savePessoa() {
    if (this.cadastrado.id) {
      
      this.pessoasService.update(this.cadastrado.id, this.cadastrado).subscribe({
        next: () => {
          this.saveEmitter.emit(); 
          this.cadastrado = {} as Pessoa;
        }
      });
    } else {
      
      this.pessoasService.save(this.cadastrado).subscribe({
        next: (data) => {
          this.saveEmitter.emit(); 
          this.cadastrado = {} as Pessoa;
        }
      });
    }
  }

  limparFormulario() {
    this.cadastrado = {} as Pessoa;
  }

  compararCategorias(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
