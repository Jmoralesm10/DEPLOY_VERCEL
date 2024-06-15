import { Component } from "@angular/core";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "src/app/material.module";
import { IndicesServicioService } from "../..";
import { CompanySelectService } from "src/app/services/model-service/dashboard/company-select.service";
import { SearchFilterService } from "src/app/services/model-service/dashboard/search-filter.service";
import { combineLatest, map } from "rxjs";

interface indicesServicio {
  id: number;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
}

interface postIndicesServicio{
  Cod_Compania: string;
  Fecha_Ini: string;
  Fecha_Fin: string;
}

@Component({
  selector: 'app-indices-servicio',
  standalone: true,
  imports:[MaterialModule, TablerIconsModule],
  templateUrl: './indices-servicio.component.html',
})

export class IndicesServicioComponent {
  dataSource: indicesServicio[] = [];
  selectedItem: string;
  selectDate: { start: string, end: string }[] = [];


  constructor(
    public _indiceServicio: IndicesServicioService,
    public _company: CompanySelectService,
    public _date: SearchFilterService,
  ){  }

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
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

      if (!isFirstValueSent) {
        isFirstValueSent = true;
        this.indiceServicios(this._company.currentCompany[0]);

        const IndicesPost: postIndicesServicio = {
          Cod_Compania: this._company.currentCompany[0],
          Fecha_Ini: firstDayOfYear.toDateString(),
          Fecha_Fin: today.toDateString()
        }

        this.postIndiceServicio(IndicesPost)

      } else {
        if(result.datosPost.Fecha_Ini == '' && result.datosPost.Fecha_Fin == ''){
          const IndicesPost: postIndicesServicio = {
            Cod_Compania: result.selectedItem,
            Fecha_Ini: firstDayOfYear.toDateString(),
            Fecha_Fin: today.toDateString()
          }
          this.postIndiceServicio(IndicesPost)

        } else {

          const IndicesPost: postIndicesServicio = {
            Cod_Compania: result.selectedItem,
            Fecha_Ini: result.datosPost.Fecha_Ini,
            Fecha_Fin: result.datosPost.Fecha_Fin
          }
          this.postIndiceServicio(IndicesPost)
        }
      }

      //console.log(result);
    });

  }

  indiceServicios(company: string){
    this._indiceServicio.getIndiceServicio(company).subscribe(data => {
      this.dataSource = [];
        if (Array.isArray(data)) {
          data.forEach((element: any) => {
            this.dataSource.push({
              id: element.Cod_Servicio,
              icon: this.getIcon(element.Cod_Servicio),
              color: this.getColor(element.Cod_Servicio),
              title: "0" + element.Total,
              // Limitar el texto a 20 caracteres
              subtitle: element.Des_Servicio
            });
          });
        } else {
          console.error("La variable 'data' no es un array.");
        };
    });
  }

  postIndiceServicio(indice: postIndicesServicio){
    this._indiceServicio.postIndiceServicio(indice).subscribe(data =>{
      this.dataSource = [];
      if (Array.isArray(data)) {
        data.forEach((element: any) => {
          this.dataSource.push({
            id: element.Cod_Servicio,
            icon: this.getIcon(element.Cod_Servicio),
            color: this.getColor(element.Cod_Servicio),
            title: "0" + element.Total,
            // Limitar el texto a 20 caracteres
            subtitle: element.Des_Servicio
          });
        });
      } else {
        console.error("La variable 'data' no es un array.");
      };
    })
  }

  getColor(codigo: number) {

    switch (codigo) {
      case 1:
        return 'primary';
      case 2:
        return 'warning';
      case 3:
        return 'accent';
      case 4:
        return 'error';
      case 5:
        return 'success';
      default:
        return 'primary';
    }
  }

  getIcon(codigo: number) {

    switch (codigo) {
      case 1:
        return 'account_circle';
      case 2:
        return 'local_mall';
      case 3:
        return 'stars';
      case 4:
        return 'content_paste';
      case 5:
        return 'stars';
      default:
        return 'local_mall';
    }
  }

}
