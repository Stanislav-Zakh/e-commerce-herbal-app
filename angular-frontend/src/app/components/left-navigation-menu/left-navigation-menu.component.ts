import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductCategory } from '../../common/product-category';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-left-navigation-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './left-navigation-menu.component.html',
  styleUrl: './left-navigation-menu.component.css',
})
export class LeftNavigationMenuComponent {

  categoryList: ProductCategory[] = [];
  isCategoriesVisible = true;

  constructor(private service: CategoryService) {

  }

  ngOnInit() {
    this.service.getCategories().subscribe(data => this.categoryList = data);
  }


  hideCategories(): void {

    this.isCategoriesVisible = !this.isCategoriesVisible;
  }

}
