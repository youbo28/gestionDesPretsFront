import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeClass, EmployeService } from '../../service/employe.service';
import { PretService, pretResponse } from '../../service/pret.service';

@Component({
  selector: 'app-pret-update',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule, NgFor],
  templateUrl: './pret-update.component.html',
  styleUrl: './pret-update.component.css'
})
export class PretUpdateComponent {
  idPret: any;
  employe: EmployeClass = { idEmploye: 0, nom: '', post: '', salaire: 0 };
  pret: pretResponse = { id: 0, montant: 0, statut: '', dureeEnMois: 0, employe: { idEmploye: 0, nom: '', post: '', salaire: 0 } }
  errors: any = [];
  constructor(private employeService: EmployeService, private pretService: PretService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.idPret = this.route.snapshot.paramMap.get('id');
    this.pretService.getPretById(this.idPret).subscribe({
      next: (res: any) => {
        // console.log(res) //used for debuging purpuses
        this.pret = res;
        this.employe = this.pret.employe;
      }, error: (err: any) => {
        // console.log(err); //used for debuging purpuses
        this.errors = err.error;
      }
    })

  }

  updatePret() {
    this.idPret = this.route.snapshot.paramMap.get('id');
    this.pret.employe = this.employe;
    this.pretService.updatePret(this.idPret, this.pret).subscribe({
      next: (res: any) => {
        // console.log(res); //used for debuging purpuses
        window.location.href = "/pret/" + this.idPret + "/info";

      }, error: (err: any) => {
        // console.log(err); //used for debuging purpuses
        this.errors = err.error;
      }
    });

  }
  fetchEmployeName() {
    // this method to show the client that whether the emoploye exist or not 
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
}
