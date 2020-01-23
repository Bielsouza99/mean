import { Employee } from './../model/employee';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  enviado: boolean = false;
  Eform: FormGroup;
  EmployeeProfile: any = ['Financeiro', 'RH', 'Vendas', 'Admin'];

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private api: ApiService) {
    this.mainForm();
  }

  ngOnInit() {
  }

  mainForm() {
    this.Eform = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      cargo: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  updateProfile(e) {
    this.Eform.get('cargo').setValue(e, {
      onlySelf: true
    });
  }

  get myForm(){
    return this.Eform.controls;
  }

  onSubmit() {
    this.enviado = true;
    if(!this.Eform.valid) {
      return false;
    } else {
      this.api.createEmployee(this.Eform.value).subscribe(
        (res) => {
          console.log('Funcionário cadastrado com sucesso');
          this.ngZone.run(() => this.router.navigateByUrl('/list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
