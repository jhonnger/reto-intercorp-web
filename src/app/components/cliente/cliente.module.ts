import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteReportComponent } from './cliente-report/cliente-report.component';
import {ClienteRoutingModule} from './cliente.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule
  ],
  declarations: [
    ClienteListComponent,
    ClienteFormComponent,
    ClienteReportComponent]
})
export class ClienteModule { }
