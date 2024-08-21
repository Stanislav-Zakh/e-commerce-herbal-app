import { Component } from '@angular/core';
import { ProductTableService } from '../../services/product-table.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../common/product';
import { CartItemService } from '../../services/cart-item.service';
import { CommonModule, Location } from '@angular/common';
import { PreviousSearchService } from '../../services/previous-search.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  product!: Product;

  previousLink!: string;

  constructor(private productService: ProductTableService, private activeRouter: ActivatedRoute,
              private cartService: CartItemService, private locationService: Location, 
              private searchService: PreviousSearchService, 
   ) {

  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(() => this.findProduct());

    this.previousLink = this.searchService.lastSearch.previousURL;
  }

  ngOnDestroy(): void {
    this.searchService.lastSearch.recentMessage = true;
  }

  findProduct(): void {
    var id: number = +this.activeRouter.snapshot.paramMap.get("id")!;
    
    this.productService.getProductById(id).subscribe(data => this.product = data);
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }

  goBack(): void {
    this.locationService.back();

  }

}
