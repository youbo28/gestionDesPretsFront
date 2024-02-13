import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PretService, pretResponse } from '../../service/pret.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-pret-info',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './pret-info.component.html',
  styleUrl: './pret-info.component.css'
})
export class PretInfoComponent {
  idPret: any;
  pret!: pretResponse;//wrapre loan(pret) object including employe
  errors: any = [NgClass,NgIf,CommonModule];
  constructor(private pretService: PretService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.idPret = this.route.snapshot.paramMap.get('id');
    this.pretService.getPretById(this.idPret).subscribe({
      next: (res: any) => {
        console.log(res);
        this.pret = res;
      }, error: (err: any) => {
        console.log(err);
        this.errors.err.error;
      }
    })
  }
}

