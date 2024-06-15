import { Routes } from '@angular/router';

// dashboards
import { AppOperadorComponent } from './operador/operador.component';
// Forms
import {
  AppAutocompleteComponent,
  AppButtonComponent,
  AppCheckboxComponent,
  AppDatepickerComponent,
  AppRadioComponent,
} from './form-elements';

export const OperadoresRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'operador',
        component: AppOperadorComponent,
        data: {
          title: 'operador',
          urls: [
            { title: 'operador', url: '/operadores/operador' },
            { title: 'operador' },
          ],
        },
      }
    ],
  },
];
