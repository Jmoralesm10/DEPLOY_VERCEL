import { Component,OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray,FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormArray, FormControl, MaxLengthValidator } from '@angular/forms'; // Importa solo lo necesario para trabajar con formularios
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  imports: [MaterialModule,
    TablerIconsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MaterialModule],
  templateUrl: './ejemplo.component.html',
})
export class EjemploComponent implements OnInit {
  addForm: UntypedFormGroup | any;
  rows: UntypedFormArray;

  constructor(private fb: UntypedFormBuilder) {
    this.addForm = this.fb.group({});
    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
    this.rows.push(this.createItemFormGroup());
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onAddRow(): void {
    this.rows.push(this.createItemFormGroup());

    console.log(this.createItemFormGroup)
  }

  onRemoveRow(rowIndex: number): void {
    this.rows.removeAt(rowIndex);
  }

  itemsChanged(): void {
    let total: number = 0;
    // tslint:disable-next-line - Disables all
    for (let t = 0; t < (<UntypedFormArray>this.addForm.get('rows')).length; t++) {
      if (
        this.addForm.get('rows')?.value[t].unitPrice !== '' &&
        this.addForm.get('rows')?.value[t].units
      ) {
      }
    }
  }

  

  createItemFormGroup(): UntypedFormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      units: ['', Validators.required],
      unitPrice: ['', Validators.required],
      itemTotal: ['0'],
    });
  }
}
