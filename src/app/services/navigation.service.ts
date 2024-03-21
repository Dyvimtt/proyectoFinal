import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  navegarAPanelInterno() {
    this.router.navigate(['/panel-interno']);
  }
}
