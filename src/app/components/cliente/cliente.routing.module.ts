import {RouterModule, Routes} from '@angular/router';
import {ClienteListComponent} from './cliente-list/cliente-list.component';
import {OPERACIONES} from '../../config/constantes';
import {ClienteFormComponent} from './cliente-form/cliente-form.component';
import {ClienteReportComponent} from './cliente-report/cliente-report.component';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [{
  path: OPERACIONES.INDEX,
  component: ClienteListComponent
},
  {
  path: OPERACIONES.CREAR,
  component: ClienteFormComponent
},
  {
  path: OPERACIONES.PROYECCION,
  component: ClienteReportComponent
}];


@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClienteRoutingModule {

}
