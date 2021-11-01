import {Component, Input, OnInit} from '@angular/core';
import {FireBaseService} from '../../../services/fire-base.service';
import {ClienteEntity} from '../../../entidades/cliente.entity';
import {DateFromFireStorePipe} from '../../../pipes/date-from-fire-store.pipe';
import {calcularEdadAnios} from '../../../utils/Utils';
import {LoaderService} from '../../../services/loader.service';
import {ESPERANZA_EDAD_MAXIMA} from '../../../config/constantes';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  providers: [DateFromFireStorePipe]
})
export class ClienteListComponent implements OnInit {

  @Input() esParaReporte: boolean;

  clientes: ClienteEntity[];
  constructor(private firebaseService: FireBaseService,
              private dateFromFirebase: DateFromFireStorePipe,
              private loaderService: LoaderService) {
    this.esParaReporte = false;
  }

  ngOnInit() {
    this.loaderService.showLoader();
    this.firebaseService.listarDatos()
      .subscribe((data: any) => {
        this.clientes = data;
        this.loaderService.hideLoader();
      }, () => {
        this.loaderService.hideLoader();
      });

  }

  getId(index: number, item: ClienteEntity) {
    return item.id;
  }

  obtenerEdad(fechaNacFireStore) {
    let edad;
    edad = calcularEdadAnios(this.dateFromFirebase.transform(fechaNacFireStore));
    return edad.format;
  }

  obtenerFechaProbableDeMuerte(fechaNacFireStore) {
    let edad, fecha;
    let mesesEsperanzaMax;
    let mesesCumplidos;
    let mesesFaltantes;

    fecha  = new Date();
    edad = calcularEdadAnios(this.dateFromFirebase.transform(fechaNacFireStore));

    mesesEsperanzaMax = parseInt(ESPERANZA_EDAD_MAXIMA + '', 10) * 12 + (ESPERANZA_EDAD_MAXIMA % 1) * 12;
    mesesCumplidos = edad.anios * 12 + edad.meses;

    mesesFaltantes = mesesEsperanzaMax - mesesCumplidos;

    fecha.setDate(fecha.getDate() + mesesFaltantes * 30);

    return fecha;
  }

}
