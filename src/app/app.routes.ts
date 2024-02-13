import { Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { EmployeCreateComponent } from './Pages/employe-create/employe-create.component';
import { EmployeInfoComponent } from './Pages/employe-info/employe-info.component';
import { EmployeUpdateComponent } from './Pages/employe-update/employe-update.component';
import { EmployeListComponent } from './Pages/employe-list/employe-list.component';
import { PretCreateComponent } from './Pages/pret-create/pret-create.component';
import { PretInfoComponent } from './Pages/pret-info/pret-info.component';
import { PretUpdateComponent } from './Pages/pret-update/pret-update.component';
import { PretListComponent } from './Pages/pret-list/pret-list.component';

export const routes: Routes = [
{path:'',component:HomePageComponent,title:'Accueil'},
{path:'employe/create',component:EmployeCreateComponent,title:'Cree un Employe'},
{path:'employe/:id/info',component:EmployeInfoComponent,title:'Employe info'},
{path:'employe/:id/update',component:EmployeUpdateComponent,title:'Modifier Employee'},
{path:'employe',component:EmployeListComponent,title:'Emloyees'},
{path:'pret/create',component:PretCreateComponent,title:'cree un Pret'},
{path:'pret/:id/info',component:PretInfoComponent,title:'Pret info'},
{path:'pret/:id/update',component:PretUpdateComponent,title:'Modifier info'},
{path:'pret',component:PretListComponent,title:'Tous les prets'},




];
