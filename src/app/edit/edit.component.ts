import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../service/api.service';
import { Employee } from './../model/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  enviado: boolean = false;
  editForm: FormGroup;
  funcionarioDados: Employee[];
  EmployeeProfile: any = ['Financeiro', 'RH', 'Vendas', 'Admin'];

  constructor(public fb: FormBuilder, private api: ApiService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.atualizarFunc();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      cargo: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  updateProfile(e){
    this.editForm.get('cargo').setValue(e, {
      onlySelf: true
    })
  }

  get myForm() {
    return this.editForm.controls;
  }

  getEmployee(id){
    this.api.getEmployee(id).subscribe(data => {
      this.editForm.setValue({
        nome: data['nome'],
        email: data['email'],
        cargo: data['cargo'],
        telefone: data['telefone']
      });
    });
  }

  atualizarFunc() {
    this.editForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      cargo: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  onSubmit(){
    this.enviado = true;
    if(!this.editForm.valid) {
      return false;
    } else {
      if(window.confirm('Tem certeza?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.api.updateEmployee(id, this.editForm.value).subscribe(res => {
          this.router.navigateByUrl('/list');
          console.log('Conteúdo atualizado com sucesso');
        }, error => {
          console.log(error);
        })
      }
    }
  }

}
