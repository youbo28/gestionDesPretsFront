import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeClass, EmployeService, employeResponse } from '../../service/employe.service';

@Component({
  selector: 'app-employe-update',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, RouterLink],
  templateUrl: './employe-update.component.html',
  styleUrl: './employe-update.component.css'
})
export class EmployeUpdateComponent {
  idEmploye: any;
  employe: employeResponse ={idEmploye:0,nom:'',salaire:0,post:'',prets:[]};
  errors: any = [];

  constructor(private employeService: EmployeService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.idEmploye = this.route.snapshot.paramMap.get('id');
    this.employeService.getEmploye(this.idEmploye).subscribe(
      {
        next: (res: any) => {
          // console.log(res); //used for debuging purpuses 
          this.employe = res;

        }, error: (err: any) => {
          // console.log(err);  //used for debuging purpuses 
          this.errors = err.error;
        }

      }
    );


  }

  updateEmploye() {
    this.idEmploye=this.route.snapshot.paramMap.get('id');
    console.log('in update employe id'+this.idEmploye);
    this.employe.prets=[];
    this.employeService.updateEmploye(this.employe, this.idEmploye).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          window.location.href = "/employe/"+ this.idEmploye +"/info";
        }, error: (err: any) => {
          console.log(err);
          this.errors = err.error;

        }

      }
    )
  }


}
