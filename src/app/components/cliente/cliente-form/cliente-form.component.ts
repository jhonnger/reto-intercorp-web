import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FireBaseService} from '../../../services/fire-base.service';
import {ClienteEntity} from '../../../entidades/cliente.entity';
import swal from 'sweetalert2';
import {LoaderService} from '../../../services/loader.service';
import {calcularEdadAnios, esFechaActualOAnterior} from '../../../utils/Utils';
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup;
  hoy = new Date();
  enviado = false;

  constructor(private formBuilder: FormBuilder,
              private firebaseService: FireBaseService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: [new Date(), [Validators.required, this.isValidDate,  Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
    });
  }

  get f() { return this.clienteForm.controls; }

  onSubmit() {

    this.enviado = true;


    if (this.clienteForm.invalid) {
      return;
    }

    this.loaderService.showLoader();
    this.firebaseService.guardar(this.fixFechaNacimiento(this.clienteForm.value))
      .subscribe(() => {
        swal('Cliente registrado correctamente', '', 'success');
        this.loaderService.hideLoader();
      }, error => {
        this.loaderService.hideLoader();
        swal('Ups! Algo salió mal. Intente en unos momentos', '', 'error');
      });
  }

  fixFechaNacimiento(clienteValue): ClienteEntity {
    let fechaNacimiento;

    fechaNacimiento = new Date(Date.parse(clienteValue.fechaNacimiento));
    return {
      ...clienteValue,
      fechaNacimiento: fechaNacimiento,
      edad: calcularEdadAnios(fechaNacimiento).anios
    };
  }

  obtenerEdad() {
    let cliente;
    if (this.f.fechaNacimiento.valid) {
      cliente = this.fixFechaNacimiento(this.clienteForm.value);
      return calcularEdadAnios(cliente.fechaNacimiento).format;
    }
    return '';
  }

  isValidDate (c: FormControl) {

    let fechaNacimiento;

    fechaNacimiento = new Date(Date.parse(c.value));

    return c.value === '' || esFechaActualOAnterior(fechaNacimiento) ? null : {
      validateDate: {
        valid: false
      }
    };
  }

}
