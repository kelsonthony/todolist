import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Todolist } from 'src/app/models/todolist';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  todolist: Todolist = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodolistService) {}

  create(): void {
    this.formataData()
    //console.log(this.todolist.dataParaFinalizar);
    this.service.create(this.todolist).subscribe((resposta) => {
      this.service.message('To-do criado com sucesso');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Falha ao criar To-do');
      this.router.navigate(['']);
    })
  }

  cancel(): void {
    this.router.navigate([''])
  }

  formataData(): void {
    let data = new Date(this.todolist.dataParaFinalizar)
    this.todolist.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }
}
