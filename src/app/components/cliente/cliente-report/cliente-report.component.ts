import { Component, OnInit } from '@angular/core';
import {FireBaseService} from '../../../services/fire-base.service';
import {ParametroEntity} from '../../../entidades/parametro.entity';
import {LoaderService} from '../../../services/loader.service';

@Component({
  selector: 'app-cliente-report',
  templateUrl: './cliente-report.component.html',
  styleUrls: ['./cliente-report.component.css']
})
export class ClienteReportComponent implements OnInit {

  parametros: ParametroEntity;
  constructor(private firebaseService: FireBaseService,
              private  loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.showLoader();
    this.firebaseService.obtenerParametros()
      .subscribe((data: any) => {
        this.parametros = data.data();
        this.parametros.desviacion = Math.sqrt(this.parametros.varianza);
        this.loaderService.hideLoader();
      }, () => {
        this.loaderService.hideLoader();
      });
  }

}
