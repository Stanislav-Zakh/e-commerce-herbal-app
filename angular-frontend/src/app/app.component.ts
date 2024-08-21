import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductTableComponent } from "./components/product-table/product-table.component";
import { LeftNavigationMenuComponent } from './components/left-navigation-menu/left-navigation-menu.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ProductTableComponent, LeftNavigationMenuComponent, 
              SearchBarComponent, RouterModule, CartStatusComponent],
})
export class AppComponent {
  title = 'angular-frontend';
}
