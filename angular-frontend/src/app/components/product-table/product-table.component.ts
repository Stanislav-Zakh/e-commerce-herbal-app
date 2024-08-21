import { Component} from '@angular/core';
import { ProductTableService } from '../../services/product-table.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItemService } from '../../services/cart-item.service';
import { PreviousSearchService } from '../../services/previous-search.service';
@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
})
export class ProductTableComponent {

  public category_id: number = 1;
  public pageNumber: number = 1;
  public pageSize: number = 8;
  public collectionSize: number = 1;

  productList: Product[] = [];

  constructor(private productService: ProductTableService, private route: ActivatedRoute,
              private cartService: CartItemService, private searchService: PreviousSearchService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.handleData());
  }

  ngOnDestroy(): void {
    this.searchService.lastSearch.pageNumber = this.pageNumber;

  }


  handleData(): void {

    if (this.route.snapshot.paramMap.has("keyword")) {
      this.handleSearch();
    } else {
      this.handleByCategoryId();
    }
  }


  handleSearch(): void {
    var keyword: string = this.route.snapshot.paramMap.get("keyword")!;

    // handle memmory
    var passed_number = 0;
    if (this.searchService.lastSearch.recentMessage) {
      passed_number = this.searchService.lastSearch.pageNumber;
      this.searchService.lastSearch.recentMessage = false;
    } else {
         passed_number = this.pageNumber;
    }

    this.productService.getProductsByKeywordWithPagination(keyword, passed_number - 1, this.pageSize)
                .subscribe((data) => {
                   this.productList = data._embedded.productList;
                   this.pageNumber = data.page.number + 1; 
                   this.pageSize = data.page.size;
                   this.collectionSize = data.page.totalElements;
                   });     
  }

  handleByCategoryId(): void {

    var hasId: boolean = this.route.snapshot.paramMap.has("category_id");

    if (hasId) {
      var passedId: number = +this.route.snapshot.paramMap.get("category_id")!;
      if (this.category_id != passedId) {
        this.pageNumber = 1;
      } 
      this.category_id = passedId;
    }
    // handle memmory
    var passed_number = 0;
    if (this.searchService.lastSearch.recentMessage) {
      passed_number = this.searchService.lastSearch.pageNumber;
      this.searchService.lastSearch.recentMessage = false;
    } else {
         passed_number = this.pageNumber;
    }
    //this.service.getProductsByCategoryId(this.category_id).subscribe(data => this.productList = data);
    console.log("Before the: " + this.pageNumber);
    this.productService.getProductsByCategoryIdWithPagination(this.category_id, passed_number - 1, this.pageSize).subscribe(
      (data) => {
          this.productList = data._embedded.productList;
          this.pageNumber = data.page.number + 1; 
          console.log(data.page.size);
          this.pageSize = data.page.size;
          this.collectionSize = data.page.totalElements;
      }
    );
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }

}
