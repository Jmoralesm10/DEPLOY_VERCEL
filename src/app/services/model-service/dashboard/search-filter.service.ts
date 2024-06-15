import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IndicesServicioComponent } from 'src/app/components/dashboard1/indice-servicios/indices-servicio.component';

interface datosDashboard{
  Fecha_Ini: string;
  Fecha_Fin: string;
};

const defaultData: datosDashboard = {
  Fecha_Ini: '',
  Fecha_Fin: ''
};

@Injectable({
  providedIn: 'root'
})

export class SearchFilterService {

  private _selectedDateSubject: BehaviorSubject<datosDashboard> = new BehaviorSubject<datosDashboard>(defaultData);
  selectedDate$ = this._selectedDateSubject.asObservable()


  constructor() { }

  setSelectedDate(datosPost: datosDashboard){
    this._selectedDateSubject.next(datosPost);
  }

  getDate(){
    console.log(this._selectedDateSubject.value);
  }

  limpiarFiltroserv() {
    //this.limpiarFiltroEvent.emit();
  }


}
