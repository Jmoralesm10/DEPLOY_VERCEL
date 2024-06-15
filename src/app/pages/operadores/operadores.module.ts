import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatNativeDateModule } from '@angular/material/core';

// map
// import { DxVectorMapModule, DxPieChartModule } from 'devextreme-angular';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// form elements
import {
  AppAutocompleteComponent,
  AppButtonComponent,
  AppCheckboxComponent,
  AppDatepickerComponent,
  AppRadioComponent,
} from './form-elements';

import { OperadoresRoutes } from './operadores.routing';
import { AppOperadorComponent } from './operador/operador.component';

@NgModule({
  declarations: [
    AppAutocompleteComponent,
    AppButtonComponent,
    AppCheckboxComponent,
    AppRadioComponent,
    AppDatepickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OperadoresRoutes),
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MaterialModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe],
})


export class OperadoresModule {
 
}

