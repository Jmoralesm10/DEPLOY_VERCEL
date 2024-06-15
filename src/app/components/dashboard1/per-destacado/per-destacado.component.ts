import { Component } from "@angular/core";
import { TablerIconsModule } from "angular-tabler-icons";
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material.module";
import { PerDescatadoService } from "../..";
import { CompanySelectService } from "src/app/services/model-service/dashboard/company-select.service";
import { SearchFilterService } from "src/app/services/model-service/dashboard/search-filter.service";
import { combineLatest, map } from "rxjs";

interface personaDestacada {
  carnet: string;
  nombre: string;
  totalServicios: number;
}

interface postPersonasDestacada{
  Cod_Compania: string;
  Fecha_Ini: string;
  Fecha_Fin: string;
}
@Component({
  selector: 'app-per-destacado',
  standalone: true,
  imports: [CommonModule, TablerIconsModule, MaterialModule],
  templateUrl: './per-destacado.component.html',
  styleUrl: './per-destacado.component.scss'
})

export class PerDestacadoComponent {

  displayedColumns2: string[] = ['carnet', 'nombre', 'servicios'];
  dataSource2: personaDestacada[] = [];
  currentMonth: string;

  constructor(
    public _personasDestacadas: PerDescatadoService,
    public _company: CompanySelectService,
    public _date: SearchFilterService
  ){

  }

  ngOnInit(){

    let isFirstValueSent = false;

    combineLatest([
      this._company.selectedItem$,
      this._date.selectedDate$
    ]).pipe(
      map(([selectedItem, datosPost]) => {
        return { selectedItem, datosPost };
      })
    ).subscribe((result) => {

      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

      if (!isFirstValueSent) {
        isFirstValueSent = true;
        this.perosnasDestacadas(this._company.currentCompany[0]);

        const IndicesPost: postPersonasDestacada = {
          Cod_Compania: this._company.currentCompany[0],
          Fecha_Ini: firstDayOfMonth.toDateString(),
          Fecha_Fin: today.toDateString()
        }

        this.postPersonDestacadas(IndicesPost)

      } else {
        if(result.datosPost.Fecha_Ini == '' && result.datosPost.Fecha_Fin == ''){
          const IndicesPost: postPersonasDestacada = {
            Cod_Compania: result.selectedItem,
            Fecha_Ini: firstDayOfMonth.toDateString(),
            Fecha_Fin: today.toDateString()
          }
          this.postPersonDestacadas(IndicesPost)

        } else {

          const IndicesPost: postPersonasDestacada = {
            Cod_Compania: result.selectedItem,
            Fecha_Ini: result.datosPost.Fecha_Ini,
            Fecha_Fin: result.datosPost.Fecha_Fin
          }
          this.postPersonDestacadas(IndicesPost)
        }
      }

      //console.log(result);
    });

  }

  perosnasDestacadas(company: string) {
    this._personasDestacadas.getPersonaDestacada(company).subscribe(data => {
      this.dataSource2 = [];
        if (Array.isArray(data)) {
          data.forEach((element: any) => {
            this.dataSource2.push({
              carnet: element.Carnet,
              nombre: element.Nombre + " " + element.Apellido,
              totalServicios: element.Total
            });
          });
        } else {
          console.error("La variable 'data' no es un array.");
        };
    })
  }

  postPersonDestacadas(personaDestacada: postPersonasDestacada){
    this._personasDestacadas.postPersonasDestacadas(personaDestacada).subscribe(data => {
      this.dataSource2 = [];
        if (Array.isArray(data)) {
          data.forEach((element: any) => {
            this.dataSource2.push({
              carnet: element.Carnet,
              nombre: element.Nombre + " " + element.Apellido,
              totalServicios: element.Total
            });
          });
        } else {
          console.error("La variable 'data' no es un array.");
        };
    })
  }
}
