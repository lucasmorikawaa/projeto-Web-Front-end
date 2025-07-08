import { Component, Input, OnInit } from '@angular/core';
import { Cadastro } from '../../cadastro';
import { Category } from '../../interfaces/category';
import { Pessoa } from '../../interfaces/Pessoa';
import { CategoryService } from '../../services/category.service';
import { PessoasService } from '../../services/pessoas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cadastrados',
  standalone: false,
  templateUrl: './cadastrados.component.html',
  styleUrl: './cadastrados.component.css'
})
export class CadastradosComponent implements OnInit {


  @Input() categories : Category [] = [];

  @Input() cadastrado : Pessoa = {} as Pessoa;

  showForm : boolean = false;
  

  cadastrados : Pessoa[] = [];

  searchTerm: string = '';
  filtroSelecionado: string = 'nome'; 
  cadastradosFiltrados: Pessoa[] = [];



  constructor(private categoryService: CategoryService, private pessoasService: PessoasService, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      {
        next:data => {this.categories = data}
      }
    );
    
    this.pessoasService.getPessoa().subscribe({
      next: data => {
        this.cadastrados = data;
        this.cadastradosFiltrados = data; 
      }
    });

    this.loadData();
  }

  loadData() {
    this.pessoasService.getPessoa().subscribe({
      next: (data) => {
        this.cadastrados = data;
        this.cadastradosFiltrados = data;
      }
    });
  }


  filtrarTabela() {
    const termo = this.searchTerm.toLowerCase();
  
    this.cadastradosFiltrados = this.cadastrados.filter(cadastro => {
      return (
        cadastro.id?.toString().toLowerCase().includes(termo) ||
        (cadastro.name ?? '').toLowerCase().includes(termo) ||
        (cadastro.email ?? '').toLowerCase().includes(termo) ||
        (cadastro.telefone ?? '').toLowerCase().includes(termo) ||
        (cadastro.datanascimento ?? '').toLowerCase().includes(termo) ||
        (cadastro.cpf?.toString().toLowerCase() ?? '').includes(termo) ||
        (cadastro.endereco ?? '').toLowerCase().includes(termo) ||
        (cadastro.cidade ?? '').toLowerCase().includes(termo) ||
        (cadastro.estado?.name ?? '').toLowerCase().includes(termo) ||
        (cadastro.cep?.toString().toLowerCase() ?? '').includes(termo)
      );
    });
  }


  edit(pessoa: Pessoa) {
    this.cadastrado = { ...pessoa }; 
    this.showForm = true;
  }

  delete(modal: any, pessoa: Pessoa){

    this.modalService.open(modal).result.then(
      (confirm) => {
        if(confirm){
          this.pessoasService.delete(pessoa).subscribe({
            next: () => {
              this.cadastrados = this.cadastrados.filter(p => p.id !== pessoa.id);
            }
          });
        }
      }
    );

  }

  favoritar(pessoa: Pessoa) {
    if (!pessoa || !pessoa.id) {
      console.error('Pessoa inválida ou sem ID:', pessoa);
      return;
    }
  
    pessoa.favorito = !pessoa.favorito;
  
    this.pessoasService.updatePessoa(pessoa.id, pessoa).subscribe({
      next: () => {
        console.log('Favorito atualizado com sucesso!');
      },
      error: err => {
        console.error('Erro ao atualizar favorito:', err);
      }
    });
  }

  onSave() {
    this.showForm = false;
    this.loadData(); 
  }

}
