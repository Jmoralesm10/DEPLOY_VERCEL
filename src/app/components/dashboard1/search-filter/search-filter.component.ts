import { JsonPipe, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MaterialModule } from "src/app/material.module";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/Helper/format-datepicker';
import { SearchFilterService } from 'src/app/services/model-service/dashboard/search-filter.service';
import { Subscription } from 'rxjs';
import { CompanySelectService } from 'src/app/services/model-service/dashboard/company-select.service';
import localeEs from '@angular/common/locales/es';
import { ToastrService } from 'ngx-toastr';

interface datos{
  Fecha_Ini: string;
  Fecha_Fin: string;
}

registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [MatFormFieldModule, MaterialModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {

  fechas: any[] = [];

  constructor(
    public _date: SearchFilterService,
    public _company: CompanySelectService,
    public _alert: ToastrService
  ){

  }

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })

  private limpiarFiltroSubscription: Subscription;

  filtrarFecha(){

    const today = new Date();

    if(this.range.controls.start.valid && this.range.controls.end && this.range.value.start != null && this.range.value.end != null){
      if(this.range.value.start <= today && this.range.value.end <= today){
        const data: datos = {
          Fecha_Ini: this.range.value.start,
          Fecha_Fin: this.range.value.end
        }

        this._date.setSelectedDate(data)
      } else {
        this._alert.error("Fecha no puede ser mayor a la fecha actual")
      }
    }else{
      this._alert.warning("Debe Seleccionar un rango valido de fechas")
    }

  }

  limpiarFiltro(){
    this.range.controls.start.reset()
    this.range.controls.end.reset()

    const data: datos = {
      Fecha_Ini: '',
      Fecha_Fin: ''
    }

    this._date.setSelectedDate(data)

  }


}
