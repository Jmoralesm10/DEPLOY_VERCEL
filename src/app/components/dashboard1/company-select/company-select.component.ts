import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "src/app/material.module";
import { CompanySelectService } from "src/app/services/model-service/dashboard/company-select.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-company-select',
  standalone: true,
  imports:[MaterialModule, TablerIconsModule, CommonModule, FormsModule],
  templateUrl: './company-select.component.html',
  styleUrl: './company-select.component.scss'
})
export class CompanySelectComponent {
  currentCompany: string[] = [];
  selectedCompany: string;

  constructor(
    public _companySelect: CompanySelectService,
    //public _indiceServicio: IndicesServicioComponent
  ){

  }

  ngOnInit(){

    this.currentCompany = this._companySelect.company();

  }

  onCompanyChange() {
    this._companySelect.setSelectedItem(this.selectedCompany);
    //console.log(this.selectedCompany);
  }

}
