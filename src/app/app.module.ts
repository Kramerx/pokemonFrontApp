import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPokemonComponent } from './component/list-pokemon/list-pokemon.component';
import { UpdatePokemonComponent } from './component/update-pokemon/update-pokemon.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RestService } from './service/rest.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    ListPokemonComponent,
    UpdatePokemonComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    AppRoutingModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
