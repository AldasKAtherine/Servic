import { Component, OnInit } from '@angular/core';
import * as algoliasearch from 'algoliasearch';
import { ActivatedRoute } from '@angular/router';

const searchClient = algoliasearch(
  'T229HYMY48',
  'b6d674233693d77c433f0ac7c0090bf5'
);

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  config = {
    indexName: 'servicios',
    searchClient,
  };

  searchParameters = {
    aroundLatLng: '40.71, -74.01',
    aroundRadius: 4000,
    hitsPerPage: 30
  }


  showingFilters = false;

  existeFiltros = true;

  constructor(private _Activatedroute:ActivatedRoute) { 
    this.searchParameters.aroundLatLng = this._Activatedroute.snapshot.paramMap.get("aroundLatLng");
  }

  toogleFiltrar(){
    console.log('HOLA');
    this.showingFilters = !this.showingFilters;
  }

  limpiar(){
    console.log(this.existeFiltros);
    this.existeFiltros = false;
    setTimeout(() =>{
      this.existeFiltros = true;
    }, 10);
  }

  ngOnInit() {
  }

  cambiarDistancia($event){
    this.searchParameters.aroundRadius = $event.detail.value * 1000;
    console.log(this.searchParameters.aroundRadius)
  }

  aplicar(){
    console.log('hoa');
    this.showingFilters = false;
  }

}
