import { Component } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuHidden = true;

  toggleMenu() {
    console.log('click');
    this.menuHidden = !this.menuHidden;
  }

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  navegarAPanelInterno() {
    this.navigationService.navegarAPanelInterno();
  }
}

