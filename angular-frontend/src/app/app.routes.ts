import { Routes } from '@angular/router';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminRedirectComponent } from './components/admin-redirect/admin-redirect.component';

export const routes: Routes = [
    {path: "checkout", component: CheckoutComponent},
    {path: "cart-details", component: CartDetailComponent},
    {path: "product-details/:id", component: ProductDetailComponent},
    {path: "search/:keyword", component: ProductTableComponent},
    {path: "products/:category_id", component: ProductTableComponent},
    {path: "products", component: ProductTableComponent},
    {path: "admin", component: AdminRedirectComponent},
    {path: "",   redirectTo: "/products", pathMatch: "full"},
    {path: "**",   redirectTo: "/products", pathMatch: "full"}  
];
