import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeClass, EmployeService } from '../../service/employe.service';

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule],
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.css'
})

/*    
  this entire componenet is dedicated for search purposes and listing
   all employes at the same time with pagination feature 
*/
export class EmployeListComponent {
  employes: EmployeClass[] = [];//used to display list of employes 
  page: number = 0;//current page
  lastPage = false; // indicate if we are in the last page of pagination 
  firstPage = true;// indicate if we are in the first page of pagination
  searchName: string = ''; // this used to holds the value of search query 
  oldSearchName: string = '';// this is used to hold the history of search so we can use pagination in better way


  constructor(private employeService: EmployeService) { }
  ngOnInit() {
    this.getAllEmployes();
  }
  getAllEmployes() {
    if (this.searchName !== '' || this.oldSearchName !== '') { /*  here we make the search query history empty and  make sure that the page is reinalized */
      this.searchName = '';
      this.oldSearchName = '';
      this.page = 0;
    }

    this.employeService.getAllEmployes(this.page).subscribe({
      next: (res: any) => {
        // console.log(res);      // //used for debuging purpuses 
        this.employes = res;
        if (this.employes.length < 10) {
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
        // console.log(err) //used for debuging purpuses 

      }
    });
  }
  nextPage() {
    if (this.employes.length < 10) {

      this.lastPage = true;
    } else {
      this.firstPage = false;
      if (this.searchName !== '') {
        this.page++;
        this.searchEmployeByName();

      } else {
        this.page++;
        this.getAllEmployes();
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

        this.searchEmployeByName();

      } else {
        this.page--;
        this.getAllEmployes();
      }
    }
  }
  deleteEmploye(event: any, idEmploye: number) {
    //deleting employe by id function 
    if (confirm('êtes-vous sûr de vouloir supprimer l’employé avec id ' + idEmploye)) {
      event.target.innerText = 'Suppression...';
    }
    this.employeService.deleteEmployeByID(idEmploye).subscribe({

      next: (res: any) => {
        // console.log(res);  //used for debuging purpuses 

        alert("Employé a été supprimé")
        this.getAllEmployes();
      }, error: (err: any) => {
        // console.log(err); //used for debuging purpuses 
        alert("une erreur occuired supprimer employe avec id " + idEmploye);
        this.getAllEmployes();
      }
    })
  }
  searchEmployeByName() {
    if (this.searchName !== this.oldSearchName) {
      this.page = 0;
      this.firstPage = true;
    }
    this.oldSearchName = this.searchName;
    this.employeService.searchEmployeByName(this.searchName, this.page).subscribe(
      {
        next: (res: any) => {
          // console.log(res);  //used for debuging purpuses 
          this.employes = res;
          if (this.employes.length < 10) {
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
      }
    );

  }

}
