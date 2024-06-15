import { Component, ViewChild, ElementRef } from '@angular/core';
import { messages } from './chat-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class AppChatComponent {
  rptEstaMensual: FormGroup;
  date = new Date();
  sidePanelOpened = true;
  msg = '';
  searchText: string = '';
  // MESSAGE
  selectedMessage: any;

  public messages: Array<any> = messages;
  searchForm: any;
  // tslint:disable-next-line - Disables all
  // messages: Object[] = messages;

  constructor(private formBuilder: FormBuilder, public loginService: LoginService, private fb: FormBuilder, private rptServicios: ReportesService, private ToastrService: ToastrService) {

    this.rptEstaMensual = this.fb.group({
      Cod_Compania: [loginService.currentUserValue.cod_compania[0], [Validators.required]],
      Anio: [String(this.date.getFullYear()), [Validators.required]],
      Mes: [String(this.date.getMonth()), [Validators.required]],
      Cod_TipoReporte: ['1'],
      Tipo_Formato: [''],
    });

    this.selectedMessage = this.messages[0];

    // search
    this.searchForm = this.formBuilder.group({
      search: '',
    });
  }

  convertirBase64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'application/pdf' });
  }

  descargarArchivo(blob: Blob, nombreArchivo: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = nombreArchivo;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  submitrptEstaMensual() {
    // Aquí puedes escribir el código que deseas que se ejecute cuando se haga clic en el botón

    this.rptServicios.GetRptEstadistico(this.rptEstaMensual.value)
      .pipe(first())
      .subscribe(
        data => {
          const base64Pdf = data.msgRespuesta; // Suponiendo que 'msgRespuesta' contiene el PDF en base64
          const blob = this.convertirBase64ToBlob(base64Pdf);
          const fileName = this.rptEstaMensual?.get('Cod_Compania')?.value + "_" + this.rptEstaMensual?.get('Anio')?.value + "_" + this.rptEstaMensual?.get('Mes')?.value + ".pdf"
          this.descargarArchivo(blob, fileName);
        },
        (error: HttpErrorResponse) => {
          this.ToastrService.error(error.error.msgRespuesta == "undefined" ? "Ocurrió un error por favor vuelta a intentarlo de nuevo." : error.error.msgRespuesta, "Error en operación", {
            progressBar: true
          });

        });


  }


  @ViewChild('myInput', { static: true }) myInput: ElementRef =
    Object.create(null);

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  // tslint:disable-next-line - Disables all
  onSelect(message: Object[]): void {
    this.selectedMessage = message;
  }

  OnAddMsg(): void {
    this.msg = this.myInput.nativeElement.value;

    if (this.msg !== '') {
      this.selectedMessage.chat.push({
        type: 'even',
        msg: this.msg,
        date: new Date(),
      });
    }

    this.myInput.nativeElement.value = '';
  }


}
