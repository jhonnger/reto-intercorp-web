import {EventEmitter, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {ClienteEntity} from '../entidades/cliente.entity';
import {defer, from} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  showLoaderEvent = new EventEmitter<boolean>();
  constructor() { }

  showLoader() {
    this.showLoaderEvent.emit(true);
  }

  hideLoader() {
    this.showLoaderEvent.emit(false);
  }
}
