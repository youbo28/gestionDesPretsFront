import { Component } from '@angular/core';
import { PretService, pretClass, pretResponse } from '../../service/pret.service';
import { EmployeClass, EmployeService } from '../../service/employe.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pret-create',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './pret-create.component.html',
  styleUrl: './pret-create.component.css'
})
export class PretCreateComponent {
  errors: any = [];//hold errors and exception response
  employe: EmployeClass = { idEmploye: 0, nom: '', post: '', salaire: 0 };//wrapte employe information without loans (prets) to avoid infinite loop 
  pret: pretResponse = { id: 0, montant: 0, statut: '', dureeEnMois: 0, employe: { idEmploye: 0, nom: '', post: '', salaire: 0 } }//used to wrap loan ibject (pret)
  constructor(private pretService: PretService, private employeService: EmployeService) { }
  ngOnInit() {


  }
  fetchEmployeName() {
    // this method to show the client that whether the emoploye exist or not it uses  dynamique date fetching 
    if (this.employe.idEmploye !== null && this.employe.idEmploye !== 0) {
      this.employeService.getEmploye(this.employe.idEmploye).subscribe({
        next: (res: any) => {
          this.errors = [];
          this.employe = res;
        }, error: (err: any) => {
          this.employe.nom = '';
          this.errors = err.error;
        }
      });
    }
  }
  createPret() {

    this.pret.employe = this.employe;
    console.log("id employe=" + this.pret.employe.idEmploye);
    this.pretService.createPret(this.pret).subscribe({
      next: (res: any) => {
        // console.log(res);  //used for debuging purpuses 
        window.location.href = "/pret";
      }, error: (err: any) => {
        // console.log(err.error); //used for debuging purpuses 
        this.errors = err.error;

      }
    })
  }
}
