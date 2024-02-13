import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeService, employeResponse } from '../../service/employe.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-employe-info',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgFor, NgClass],
  templateUrl: './employe-info.component.html',
  styleUrl: './employe-info.component.css'
})
export class EmployeInfoComponent {
  idEmploye!: any;
  errors!: any[];
  employe!: employeResponse; //used to get full employe object including his loans (prets)
  constructor(private employeService: EmployeService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.idEmploye = this.route.snapshot.paramMap.get("id");
    this.employeService.getEmploye(this.idEmploye).subscribe({
      next: (res: any) => {

        // console.log(res);  //used for debuging purpuses 
        this.employe = res;
      }, error: (err: any) => {
        // console.log(err);  //used for debuging purpuses 

      }

    })
  }
}
