import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteReportComponent } from './cliente-report/cliente-report.component';
import {ClienteRoutingModule} from './cliente.routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AppModule} from '../../app.module';
import {DateFromFireStorePipe} from '../../pipes/date-from-fire-store.pipe';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [
    ClienteListComponent,
    ClienteFormComponent,
    ClienteReportComponent,
    DateFromFireStorePipe]
})
export class ClienteModule { }
