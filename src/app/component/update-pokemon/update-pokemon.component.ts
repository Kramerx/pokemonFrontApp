import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon, ResultAdd } from 'src/app/model/pokemon';
import { RestService } from 'src/app/service/rest.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-pokemon',
  templateUrl: './update-pokemon.component.html',
  styleUrls: ['./update-pokemon.component.css']
})
export class UpdatePokemonComponent implements OnInit {

  @Input() pokemon: Pokemon;
  @Output() savePokemon = new EventEmitter<ResultAdd>();
  @Output() cancel = new EventEmitter();
  public loading: boolean;
  public minValue: number;
  public maxValue: number;
  public typesPokemon: string[];
  public formPokemon: FormGroup;

  constructor(private restService: RestService) {
    this.pokemon = new Pokemon();
    this.loading = false;
    this.minValue = 0;
    this.maxValue = 100;
    this.typesPokemon = ['water', 'fire', 'normal', 'bug', 'poison']
    this.formPokemon = new FormGroup({});
  }

  ngOnInit() {
    this.setUpdatePokemon(this.pokemon);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setUpdatePokemon(changes["pokemon"].currentValue);
  }

  public setUpdatePokemon(pokemon: Pokemon): void {
    this.formPokemon = new FormGroup({
      id: new FormControl(pokemon.id),
      name: new FormControl(pokemon.name, [Validators.required]),
      image: new FormControl(pokemon.image, [Validators.required]),
      type: new FormControl(pokemon.type, [Validators.required]),
      hp: new FormControl(pokemon.hp, [Validators.required]),
      attack: new FormControl(pokemon.attack, [Validators.required]),
      defense: new FormControl(pokemon.defense, [Validators.required]),
      idAuthor: new FormControl(pokemon.idAuthor)
    });
  }

  public onAddUpdatePokemon() {
    this.loading = true;
    this.restService.updatePokemon(this.formPokemon.value).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Exito!',
          text: 'Se guardo la información ingresada.',
          icon: 'success'
        })
        this.savePokemon.emit({
          isNew: this.pokemon.id ? false : true,
          pokemon: data
        })
        this.pokemon = new Pokemon();
        this.loading = false;
      },
      error: (err) => {
        console.warn(err)
        this.loading = false;
        Swal.fire({
          text: 'No se pudo guardar la información ingresada. Intente más tarde.',
          icon: 'error'
        })
      }
    });
  }

  public onClickCancel() {
    this.cancel.emit();
  }

}
