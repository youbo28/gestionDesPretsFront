import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PretService, pretResponse } from '../../service/pret.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pret-list',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule,NgIf,NgFor],
  templateUrl: './pret-list.component.html',
  styleUrl: './pret-list.component.css'
})
export class PretListComponent {
  prets: pretResponse[] = [];
  searchType: string = 'nameSearch';
  oldSearchStatut: string = '';
  searchStatut: string = '';
  oldsearchName: string = '';
  searchName: string = '';
  firstPage: boolean = true;
  lastPage: boolean = false;
  page = 0;
  constructor(private pretService: PretService) { }
  ngOnInit() {
    this.getAllPrets();
  }
  getAllPrets() {
    if (this.searchName !== '' || this.searchStatut !== '') {
      this.searchName = '';
      this.oldSearchStatut = '';
      this.oldsearchName = '';
      this.searchStatut = '';
      this.page = 0;
    }
    this.pretService.getAllPrets(this.page).subscribe({
      next: (res: any) => {
        // console.log(res); //used for debuging purpuses 
        this.prets = res;
        if (this.prets.length < 10) {
          this.lastPage = true

        } else {
          this.lastPage = false;
        }

        if (this.page === 0) {
          this.firstPage = true;
        } else {
          this.firstPage = false;
        }
      }, error: (err: any) => {
        // console.log(err); //used for debuging purpuses 
      }
    })
  }
  deletePretByID(event: any, idPret: number) {
    if (confirm('êtes-vous sûr de vouloir supprimer le pret avec id ' + idPret)) {
      event.target.innerText = 'Suppression...';
    }
    this.pretService.deletePretById(idPret).subscribe({
      next: (res: any) => {
        // console.log(res); //used for debuging purpuses
        this.getAllPrets();
        alert('Pret a été supprimé')
      }, error: (err: any) => {
        // console.log(err); //used for debuging purpuses
        alert("une erreur occuired supprimer employe avec id " + idPret);
        this.getAllPrets();
      }
    });

  }
  searchPretByName() {
    if (this.searchName !== this.oldsearchName || this.searchStatut !== '' || this.oldSearchStatut !== '') {
      this.searchStatut = '';
      this.oldSearchStatut = '';
      this.page = 0;
    }
    this.oldsearchName = this.searchName;
    this.pretService.searchPretByEmployeName(this.searchName, this.page).subscribe({
      next: (res: any) => {
        // console.log(res); //used for debuging purpuses
        this.prets = res;
        if (this.prets.length < 10) {
          this.lastPage = true

        } else {
          this.lastPage = false;
        }

        if (this.page === 0) {
          this.firstPage = true;
        } else {
          this.firstPage = false;
        }
      }, error: (err: any) => {
        // console.log(err);//used for debuging purpuses
      }
    });

  }
  searchPretByStatut() {
    if (this.searchStatut !== this.oldSearchStatut || this.searchName !== '' || this.oldsearchName !== '') {
      this.searchName = '';
      this.oldsearchName = '';
      this.page = 0;
    }

    this.oldSearchStatut = this.searchStatut;
    console.log('inside search by type');
    this.pretService.searchPretByStatut(this.searchStatut, this.page).subscribe({
      next: (res: any) => {
        // console.log(res); //used for debuging purpuses
        this.prets = res;
        if (this.prets.length < 10) {
          this.lastPage = true

        } else {
          this.lastPage = false;
        }

        if (this.page === 0) {
          this.firstPage = true;
        } else {
          this.firstPage = false;
        }
      }, error: (err: any) => {
        // console.log(err); //used for debuging purpuses
      }
    })
  }
  nextPage() {
    if (this.prets.length < 10) {

      this.lastPage = true;
    } else {
      this.firstPage = false;
      if (this.searchName !== '') {
        this.page++;
        this.searchPretByName();

      } else if (this.searchStatut !== '') {
        this.page++;
        this.searchPretByStatut();
      }
      else {
        this.page++;
        console.log("in nex page no search")
        this.getAllPrets();
      }
    }

  }
  previousPage() {
    if (this.page === 0) {
      this.firstPage = true;
    } else {
      this.lastPage = false;
      if (this.searchName !== '') {
        this.page--;

        this.searchPretByName();

      } if (this.searchStatut !== '') {
        this.page--;
        this.searchPretByStatut();
      }
      else {
        this.page--;
        this.getAllPrets();
      }
    }
  }
}
