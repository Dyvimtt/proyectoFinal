import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-panel-interno',
  templateUrl: './panel-interno.component.html',
  styleUrl: './panel-interno.component.css'
})
export class PanelInternoComponent{

  activeSubMenu: string = ''; // Almacena el identificador de la sección de menú activa

  toggleSubMenu(menuItem: string) {
    this.activeSubMenu = (this.activeSubMenu === menuItem) ? '' : menuItem; // Alternar la visibilidad del submenú
  }
}
