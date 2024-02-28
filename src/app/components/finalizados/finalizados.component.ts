import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Todolist } from 'src/app/models/todolist';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent {

  listFinished: Todolist[] = [];

  constructor(private service: TodolistService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
    
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(todolist => {
        if(todolist.finalizado) {
          this.listFinished.push(todolist);
        } 
      })
    })
  }

  voltar(): void {
    this.router.navigate([''])
  }

}
