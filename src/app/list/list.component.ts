import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  Funcionarios: any = [];
  constructor(private api: ApiService) {
    this.readFunc();
  }

  ngOnInit() {
  }

  readFunc(){
    this.api.getEmployees().subscribe((data) => {
      this.Funcionarios = data;
    });
  }

  removeFunc(funcionario, index) {
    if(window.confirm('Tem certeza?')) {
      this.api.deleteEmployee(funcionario._id).subscribe((data) => {
        this.Funcionarios.splice(index, 1);
      })
    }
  }

}
