import { NgIf } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeClass, EmployeService } from '../../service/employe.service';

@Component({
  selector: 'app-employe-create',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './employe-create.component.html',
  styleUrl: './employe-create.component.css'
})
export class EmployeCreateComponent {
  constructor(private employeService: EmployeService) { }
  employe: EmployeClass = { idEmploye: 0, nom: '', salaire: 0, post: '' };//intialize employe
  errors: any = []; //used to show input errors
  nom!: string;
  salaire!: number;
  post!: string;
  ngOnInit() {
  }
  createEmploye() {


    this.employeService.createEmploye(this.employe).subscribe(

      {
        next: (res: any) => {
          //      console.log("res=" + res); //used for debuging purpusses 

          window.location.href = "/employe";
        }, error: (err: any) => {
          //      console.log(err)    //used for debuging purpusses
          this.errors = err.error;
        }


      })


  }
}
