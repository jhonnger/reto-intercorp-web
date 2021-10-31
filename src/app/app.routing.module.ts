import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PAGINAS} from './config/constantes';


const appRoutes: Routes = [{
  path: PAGINAS.CLIENTE,
  loadChildren: './components/cliente/cliente.module#ClienteModule',
},
  {
    path: '**', redirectTo: PAGINAS.CLIENTE
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
