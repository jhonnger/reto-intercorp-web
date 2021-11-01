import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore';

import {map, switchMap} from 'rxjs/operators';
import {ClienteEntity} from '../entidades/cliente.entity';
import {defer, from, of} from 'rxjs';
import {DOCUMENTOS, ID_PARAMETROS} from '../config/constantes';
import {ParametroEntity} from '../entidades/parametro.entity';


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {


  constructor(private db: AngularFirestore) { }

  listarDatos() {
    return this.db.collection('clientes').snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as ClienteEntity;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  guardar(cliente: ClienteEntity) {
    let parametro: ParametroEntity;
    let nuevosParametros;

    return this.registrarCliente(cliente)
      .pipe(switchMap(() => {

        return this.obtenerParametros()
          .pipe(switchMap((data: any) => {
            parametro = data.data();

            nuevosParametros = this.calcularNuevosParametros(parametro, cliente.edad);
            return this.db.collection(DOCUMENTOS.PARAMETROS)
              .doc(ID_PARAMETROS)
              .update({
                promedio: nuevosParametros.promedio,
                varianza: nuevosParametros.varianza,
                cantidadRegistros: nuevosParametros.cantidadRegistros
              });
          }));
      }));


  }

  obtenerParametros() {
    return this.db.collection(DOCUMENTOS.PARAMETROS).doc(ID_PARAMETROS)
      .get();
  }

  calcularNuevosParametros(parametro: ParametroEntity, nuevoNumero: number) {
    let nuevoPromedio;
    let nuevaVarianza;

    nuevoPromedio = ((parametro.promedio * parametro.cantidadRegistros) + nuevoNumero) / (parametro.cantidadRegistros + 1);
    nuevaVarianza = ((parametro.cantidadRegistros) * parametro.varianza + (nuevoNumero - nuevoPromedio) * (nuevoNumero - parametro.promedio) ) / (parametro.cantidadRegistros + 1);

    return {...parametro, promedio: nuevoPromedio, varianza: nuevaVarianza, cantidadRegistros: parametro.cantidadRegistros + 1};
  }

  registrarCliente(cliente: ClienteEntity) {
    return defer(() => from(this.db.collection(DOCUMENTOS.CLIENTES).add(cliente)));
  }
}
