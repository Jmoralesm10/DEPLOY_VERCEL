import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray, FormControl, MaxLengthValidator } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material.module';
import { CatalogoService } from 'src/app/services/catalogo.service';
import {environment} from "../../../../environments/environment";
import {userService} from "../../../services/user.service";
import * as XLSX from 'xlsx';


interface personalData {
  Carnet: string;
  Nombre: string;
  Apellido: string;
  cargo: string;
}
interface TipoServicio {
  Cod_servicio: any;
  Descripcion_Servicio: string;
}

interface PilotoData {
  Carnet: any;
  Nombre: string;
  cargo: string;
}

@Component({
  selector: 'app-formulario-reportes',
  standalone: true,
  templateUrl: './Formulario-reporte.component.html',
  styleUrls: ['./Formulario-reportes.component.css'],
  imports: [ ReactiveFormsModule ]
})

export class FormularioReportesComponent implements OnInit {
  formulario!: FormGroup;
  userInfo : any;
  companiaPrincipal: number;
  personal: personalData[] = [];
  servicio: TipoServicio[] = [];
  piloto: PilotoData[] = [];

  companias = ['44', '45', '46']; // Ejemplo de compañías
  anos = ['2022', '2023', '2024']; // Ejemplo de años
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril']; // Ejemplo de meses
  tiposReporte = ['Control Mensual', 'Control Anual']; // Ejemplo de tipos de reporte


  constructor(private fb: FormBuilder, public loginService: LoginService, private ToastrService: ToastrService, public catalogoService: CatalogoService) {
    this.formulario = this.fb.group({
      Login: [loginService.currentUserValue.usuario, [Validators.required]],
      Nombre: [null, [Validators.required]],
      Apellido: ['', [Validators.required]],
      CUI: ['', Validators.compose([Validators.required, Validators.minLength(13),Validators.maxLength(13)])],
      Correo: ['', [Validators.required]],
      Genero: ['M', [Validators.required]],
      Telefono: [''],
      Celular: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Fecha_Nac: ['', [Validators.required]],
      url_Imagen: [loginService.currentUserValue.url_imagen],
      Compania: [loginService.currentUserValue.cod_compania, [Validators.required]],
      Contrasenia: [''],
      NuevaContrasenia: [''],
      ConfirmarContrasenia: [''],
    });
    this.userInfo = new userService().userAccount()
    console.log(this.userInfo)

  }

  ngOnInit() {
    //console.log(this.fgPerfilUser.get('Compania').value)
    //console.log(this.fgPerfilUser.controls.Apellido.value);

    this.getCatalogos();

  }

  async getCatalogos() {
    this.companiaPrincipal = this.userInfo.cod_compania[0];
    const api = environment.SERVER_URL + `Catalogos/general?Cod_Compania=${this.companiaPrincipal}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.userInfo.token
    };

    const respuesta = await fetch(api, {
      method: 'GET',
      headers: headers
    });


    
    const catalogos = await respuesta.json();

    console.log(catalogos)

    //llenar el array de personal con los datos de la API
    catalogos.vobo.forEach((element: any) => {
      this.personal.push(
        {
          Carnet: element.Carnet,
          Nombre: element.Nombre,
          cargo: element.cargo,
          Apellido: element.Apellido
        }
      );
    });


    console.log(this.personal[0].Nombre)

    catalogos.TipoServicio.forEach((elements: any) => {
      this.servicio.push(
        {
          Cod_servicio: elements.Cod_servicio,
          Descripcion_Servicio: elements.Descripcion_Servicio
        }
      );
    });

    console.log(this.servicio[0].Cod_servicio)
  

  catalogos.Piloto.forEach((element: any) => {
    this.piloto.push(
      {
        Carnet: element.Carnet,
        Nombre: element.Nombre,
        cargo: element.cargo,
      }
    );
  });

  console.log(this.piloto[0].Carnet)

  
}

}

// /*FORMULARIO PARA REPORTES DE SERVICIO*/
// @Component({
//   selector: 'app-formulario-reportes',
//   standalone: true,
//   templateUrl: './Formulario-reporte.component.html',
//   styleUrls: ['./Formulario-reportes.component.css'],
//   imports: [ ReactiveFormsModule ]
// })
//
// export class FormularioReporteComponent implements OnInit {
//   formulario: FormGroup;
//   companias = ['44', '45', '46']; // Ejemplo de compañías
//   constructor(private fb: FormBuilder) {
//     this.formulario = this.fb.group({
//       cia: ['', Validators.required],
//       Fecha_inicio: ['', Validators.required],
//       Fecha_finalizacion: ['', Validators.required],
//       Nombre_solicitante: ['', Validators.required]
//     });
//   }
//
//   ngOnInit(): void {
//   }
//
//   onSubmit() {
//     if (this.formulario.valid) {
//       // Aquí puedes manejar la lógica para cuando se envía el formulario
//       console.log('Formulario válido');
//       console.log(this.formulario.value);
//     } else {
//       console.log('Formulario inválido');
//     }
//   
//   }
// }

/*FORMULARIO PARA REPORTES DE SERVICIO*/



