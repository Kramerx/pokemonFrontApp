import { Component, OnInit } from '@angular/core';
import { Pokemon, ResultAdd } from 'src/app/model/pokemon';
import { RestService } from 'src/app/service/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})
export class ListPokemonComponent implements OnInit {

  public listHeaders: string[];
  public listPokemon: Pokemon[];
  public searchListPokemon: Pokemon[];
  public loading: boolean;
  public imageNotFound: string;
  public addUpdatePokemon: boolean;
  public pokemonSelected: Pokemon;
  public indexPokemonEdit: number;
  public pokemonSearch: string;

  constructor(private restService: RestService) {
    this.imageNotFound = 'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png';
    this.listHeaders = ['Nombre', 'Imagen', 'Ataque', 'Defensa', 'Acciones'];
    this.listPokemon = [];
    this.searchListPokemon = [];
    this.loading = false;
    this.addUpdatePokemon = false;
    this.pokemonSelected = new Pokemon();
    this.indexPokemonEdit = 0;
    this.pokemonSearch = '';
  }

  ngOnInit(): void {
    this.loading = true;
    this.restService.getPokemon().subscribe({
      next: (data: Pokemon[]) => this.setListPokemon(data),
      error: (err) => {
        console.warn(err)
        this.loading = false;
        Swal.fire({
          text: 'No se pudo obtener la lista de pokemon. Intente más tarde.',
          icon: 'error'
        })
      }
    });
  }

  private setListPokemon(list: Pokemon[]): void {
    this.listPokemon = list;
    this.searchListPokemon = list;
    this.loading = false;
  }

  public onClickDelete(index: number): void {
    const pokemon = this.listPokemon[index];
    this.listPokemon.splice(index, 1);
    if (pokemon.id) {
      this.loading = true;
      this.restService.deletePokemon(pokemon.id).subscribe({
        next: () => {
          this.loading = false;
          Swal.fire({
            title: 'Exito!',
            text: 'Se eliminó el pokemon seleccionado.',
            icon: 'success'
          })
        },
        error: (err) => {
          this.loading = false;
          console.warn(err)
          Swal.fire({
            text: 'No se pudo eliminar el pokemon seleccionado. Intente más tarde.',
            icon: 'error'
          })
        }
      });
    } else {
      Swal.fire({
        title: 'Lo sentimos',
        text: 'La información seleccionada no se pudo encontrar.',
        icon: 'success'
      })
    }
  }

  public onClickEdit(index: number): void {
    this.addUpdatePokemon = true;
    this.indexPokemonEdit = index
    this.pokemonSelected = this.listPokemon[index];
  }

  public onAddUpdate(event: ResultAdd): void {
    if (event.isNew) {
      this.listPokemon.push(event.pokemon)
    } else {
      this.listPokemon[this.indexPokemonEdit] = event.pokemon;
    }
    this.addUpdatePokemon = false;
  }

  public onCancel(): void {
    this.addUpdatePokemon = false;
  }

  public onClickAdd(): void {
    this.addUpdatePokemon = true;
    this.pokemonSelected = new Pokemon()
  }

  public onChangeSearch(): void {
    this.searchListPokemon = this.listPokemon.filter(e => e.name.toLowerCase().includes(this.pokemonSearch.toLowerCase()))
  }

}
