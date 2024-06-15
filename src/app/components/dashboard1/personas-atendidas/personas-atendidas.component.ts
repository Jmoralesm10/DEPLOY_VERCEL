import { Component } from '@angular/core';
import { CommonModule} from "@angular/common";
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import {environment} from "../../../../environments/environment";
import {userService} from "../../../services/user.service";
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { PersonasAtendidasService } from 'src/app/services/model-service/dashboard/personas-atendidas.service';
import { CompanySelectService } from 'src/app/services/model-service/dashboard/company-select.service';
import { combineLatest, map } from 'rxjs';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { SearchFilterService } from 'src/app/services/model-service/dashboard/search-filter.service';

interface ourvisitorChart {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  tooltip: ApexTooltip | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  stroke: any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
}

interface postPersonasAtendida{
  Cod_Compania: string;
  Fecha_Ini: string;
  Fecha_Fin: string;
}


@Component({
  selector: 'app-personal-atendido',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule, CommonModule],
  templateUrl: './personas-atendidas.component.html',
})



export class PersonasAtendidasComponent {

  userInfo : any;
  companiaPrincipal: number;
  public ourvisitorChart!: Partial<ourvisitorChart> | any;



  constructor(
    public _personasAtendidas: PersonasAtendidasService,
    public _company: CompanySelectService,
    public _date: SearchFilterService
  ) {
    this.userInfo = new userService().userAccount()
    this.ourvisitorChart = {
      series: [0,0, 0, 0, 0],
      chart: {
        id: 'donut-chart',
        type: 'donut',
        height: 200,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        foreColor: '#adb0bb',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70px',
            background: 'transparent',
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: ["Rescate","Varios","Ambulancia","Incendio","otros"],
      colors: ['#1e88e5', '#26c6da', '#745af2', '#eceff1', '#f77e53'],
      responsive: [{ breakpoint: 480, options: { chart: { height: 230 } } }],
    };
  }

  ngOnInit() {

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
        this.personasAtendidas(this._company.currentCompany[0]);

        const IndicesPost: postPersonasAtendida = {
          Cod_Compania: this._company.currentCompany[0],
          Fecha_Ini: firstDayOfYear.toDateString(),
          Fecha_Fin: today.toDateString()
        }

        this.postpersonasAtendidas(IndicesPost)

      } else {
        if(result.datosPost.Fecha_Ini == '' && result.datosPost.Fecha_Fin == ''){
          const IndicesPost: postPersonasAtendida = {
            Cod_Compania: result.selectedItem,
            Fecha_Ini: firstDayOfYear.toDateString(),
            Fecha_Fin: today.toDateString()
          }
          this.postpersonasAtendidas(IndicesPost)

        } else {

          const IndicesPost: postPersonasAtendida = {
            Cod_Compania: result.selectedItem,
            Fecha_Ini: result.datosPost.Fecha_Ini,
            Fecha_Fin: result.datosPost.Fecha_Fin
          }
          this.postpersonasAtendidas(IndicesPost)
        }
      }

      //console.log(result);
    });
  }

  numerosPersonalAtendido = [ ]

  personasAtendidas(company: string) {
    this._personasAtendidas.getPersonasAtendidas(company).subscribe(data => {
      this.ourvisitorChart.series = [
        this.numerosPersonalAtendido = data[6][0],//Rescate
        this.numerosPersonalAtendido = data[6][1],//Varios
        this.numerosPersonalAtendido = data[6][2],//Ambulancia
        this.numerosPersonalAtendido = data[6][3],//Incendio
        this.numerosPersonalAtendido = data[6][4]//otroes
      ];
      //console.log(data)
    })
  }

  postpersonasAtendidas(personaAtendida: postPersonasAtendida){
    this._personasAtendidas.postPersonasAtendidas(personaAtendida).subscribe(data => {
      this.ourvisitorChart.series = [
        this.numerosPersonalAtendido = data[6][0],//Rescate
        this.numerosPersonalAtendido = data[6][1],//Varios
        this.numerosPersonalAtendido = data[6][2],//Ambulancia
        this.numerosPersonalAtendido = data[6][3],//Incendio
        this.numerosPersonalAtendido = data[6][4]//otroes
      ];
    })
  }

/*
  async getPersonasAtendidas() {
    this.companiaPrincipal = this.userInfo.cod_compania[0];
    const api = environment.SERVER_URL + `estadisticaAnual?Cod_Compania=${this.companiaPrincipal}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.userInfo.token
    };

    const respuesta = await fetch(api, {
      method: 'GET',
      headers: headers
    });

    const numerosPersonalAtendido = await respuesta.json();


    this.ourvisitorChart.series = [
      numerosPersonalAtendido[6][0],//Rescate
      numerosPersonalAtendido[6][1],//Varios
      numerosPersonalAtendido[6][2],//Ambulancia
      numerosPersonalAtendido[6][3],//Incendio
      numerosPersonalAtendido[6][4]//otroes
    ];

    // console.log({
    //   "Rescate": numerosPersonalAtendido[6][0],
    //   "Varios": numerosPersonalAtendido[6][1],
    //   "Ambulancia": numerosPersonalAtendido[6][2],
    //   "Incendio": numerosPersonalAtendido[6][3],
    //   "otros": numerosPersonalAtendido[6][4],
    // })

  }
*/
}
