import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'HOME', routerLink: [""]},
      {label: 'CARS', routerLink: ["cars"]},
      {label: '***', icon: 'pi pi-fw pi-pencil'},
      {label: '***', icon: 'pi pi-fw pi-file'},
      {label: '***', icon: 'pi pi-fw pi-cog'}
  ];
  }

}