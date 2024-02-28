import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Todolist } from "src/app/models/todolist";
import { TodolistService } from "src/app/services/todolist.service";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent {
  todolist: Todolist = {
    titulo: "",
    descricao: "",
    dataParaFinalizar: new Date(),
    finalizado: false,
  };

  constructor(private router: Router, 
    private service: TodolistService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.todolist.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
    
  }

  cancel(): void {
    this.router.navigate([""]);
  }

  formataData(): void {
    let data = new Date(this.todolist.dataParaFinalizar);
    this.todolist.dataParaFinalizar = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;
  }

  findById(): void {
    this.service.findById(this.todolist.id).subscribe((resposta) => {
      this.todolist = resposta;
    })
  }

  update(): void {
    this.service.update(this.todolist).subscribe((resposta) => {
      this.service.message("Informações atualizadas com sucesso!");
      this.router.navigate(['']);
    }, error => {
      this.service.message("Falha ao atualizar To-do!");
      this.router.navigate(['']);
    });
  }
}
