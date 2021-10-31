import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup;
  enviado = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required,  Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
    });
  }

  get f() { return this.clienteForm.controls; }

  onSubmit() {

    this.enviado = true;

    // stop here if form is invalid
    if (this.clienteForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)')
  }

}
