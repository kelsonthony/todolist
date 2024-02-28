import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Todolist } from '../models/todolist';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Todolist[]> {
    return this.http.get<Todolist[]>(this.baseUrl);
  }

  findById(id: any): Observable<Todolist> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Todolist>(url);
  }

  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url);
  }

  update(todolist: Todolist): Observable<Todolist> {
    const url = `${this.baseUrl}/${todolist.id}`
    return this.http.put<Todolist>(url, todolist);
  }

  create(todolist: Todolist): Observable<Todolist> {
    return this.http.post<Todolist>(this.baseUrl, todolist);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
