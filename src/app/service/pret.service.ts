import { Injectable } from '@angular/core';
import { EmployeClass } from './employe.service';
import { HttpClient } from '@angular/common/http';


export interface pretClass {
  id: number;
  montant: number;
  dureeEnMois: number;
  statut: string;

}
export interface pretResponse {
  id: number;
  montant: number;
  dureeEnMois: number;
  statut: string;
  employe: EmployeClass;
}
@Injectable({
  providedIn: 'root'
})

export class PretService {

  constructor(private httpClient: HttpClient) { }
  createPret(pret: pretResponse) {
    return this.httpClient.post("http://localhost:8080/api/prets", pret);

  }
  getPretById(idPret: number) {
    return this.httpClient.get("http://localhost:8080/api/prets/" + idPret);
  }
  updatePret(idPret: number, pret: pretResponse) {
    return this.httpClient.put("http://localhost:8080/api/prets/" + idPret, pret);
  }
  getAllPrets(page: number) {
    return this.httpClient.get("http://localhost:8080/api/prets?page=" + page);
  }
  deletePretById(idPret: number) {
    return this.httpClient.delete("http://localhost:8080/api/prets/" + idPret);
  }
  searchPretByEmployeName(employeName: string, page: number) {
    console.log("http://localhost:8080/api/prets/searchByEmploye?nomemploye=" + employeName + '&&page=' + page)
    return this.httpClient.get("http://localhost:8080/api/prets/searchByEmploye?nomemploye=" + employeName + '&&page=' + page);

  }
  searchPretByStatut(statut: string, page: number) {
    console.log("http://localhost:8080/api/prets/search?statut=" + statut + "&&page=" + page)
    return this.httpClient.get("http://localhost:8080/api/prets/search?statut=" + statut + "&&page=" + page);
  }
}
