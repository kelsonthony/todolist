import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Todolist } from "src/app/models/todolist";
import { TodolistService } from "src/app/services/todolist.service";

@Component({
  selector: "app-read-all",
  templateUrl: "./read-all.component.html",
  styleUrls: ["./read-all.component.css"],
})
export class ReadAllComponent {
  list: Todolist[] = [];
  listFinished: Todolist[] = [];

  closed = 0;

  constructor(private service: TodolistService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((todolist) => {
        if (todolist.finalizado) {
          this.listFinished.push(todolist);
        } else {
          this.list.push(todolist);
        }
      });
      this.closed = this.listFinished.length;
    });
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message("Task Deletada com sucesso!");
        this.list = this.list.filter((todolist) => todolist.id !== id);
      }
    });
  }

  navegarParaFinalizados(): void {
    this.router.navigate(["finalizados"]);
  }

  finalizar(item: Todolist): void {
    item.finalizado = true;
    this.service.update(item).subscribe(() => {
      this.service.message("Task Finalizada com sucesso!");
      this.list = this.list.filter((todolist) => todolist.id !== item.id);
      this.closed++;
    });
  }
}
