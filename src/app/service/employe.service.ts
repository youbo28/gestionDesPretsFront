import { Injectable } from '@angular/core';
import { pretClass, pretResponse } from './pret.service';
import { HttpClient } from '@angular/common/http';


export interface EmployeClass {
  idEmploye: number;
  nom: string;
  post: string;
  salaire: number;
}
export interface employeResponse {
  idEmploye: number;
  nom: string;
  post: string;
  salaire: number;
  prets: pretClass[];
}
@Injectable({
  providedIn: 'root'
})

export class EmployeService {

  constructor(private httpClient: HttpClient) { }
  createEmploye(employe: EmployeClass) {

    return this.httpClient.post('http://localhost:8080/api/employe', employe);
  }
  getEmploye(idEmploye: number) {
    return this.httpClient.get('http://localhost:8080/api/employe/' + idEmploye);
  }
  updateEmploye(employe: employeResponse, idEmploye: any) {
    console.log('http://localhost:8080/api/employe/' + idEmploye);
    console.log(employe.idEmploye, employe.nom, employe.post, employe.salaire, employe.prets)
    return this.httpClient.put('http://localhost:8080/api/employe/' + idEmploye, employe);
  }
  getAllEmployes(page: number) {
    return this.httpClient.get('http://localhost:8080/api/employe?page=' + page);
  }
  deleteEmployeByID(idEmploye: number) {
    return this.httpClient.delete('http://localhost:8080/api/employe/' + idEmploye);
  }
  searchEmployeByName(searchName: string, page: number) {
    return this.httpClient.get('http://localhost:8080/api/employe/search?nom=' + searchName + '&&page=' + page);
  }
}
