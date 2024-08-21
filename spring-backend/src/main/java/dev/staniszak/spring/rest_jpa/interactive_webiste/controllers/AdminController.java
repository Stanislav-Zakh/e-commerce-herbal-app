package dev.staniszak.spring.rest_jpa.interactive_webiste.controllers;

import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Product;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.ProductCategory;
import dev.staniszak.spring.rest_jpa.interactive_webiste.services.ProductService;
import jakarta.websocket.server.PathParam;


/*
Controller for the endpoints that perform administrative functions (e.g. can edit database).
Thymeleaf is used to provide basic user Interface.
Secured by the Spring Security API which is configured in appSecurityConfig.java
 */

@Controller
@RequestMapping("/control")
public class AdminController {

    private ProductService productService;

    public AdminController(ProductService productService) {
       this.productService = productService;
    }

    @GetMapping("/admin") 
    public String provideAdminWelcome(Model model) {

        model.addAttribute("categories", productService.findAllCategories());

        return "admin-welcome";
    }
    

    @GetMapping("/products") 
    public String provideAdminProducts(@RequestParam("category_id") Long category_id,  Model model) {
        
        List<Product> products = this.productService.findProductsByCategoryId(category_id);
        List<ProductCategory> categories = this.productService.findAllCategories();

        model.addAttribute("product", new Product());
        model.addAttribute("products", products);
        model.addAttribute("categories", categories);
        model.addAttribute("default_category", category_id);

        return "admin-products";
    }

    @PostMapping("/products/save")
    public String saveProduct(@ModelAttribute("product") Product product) {
        product.setCategory(productService.findCategoriesById(product.getCategory().getId()));
        if (product.getId() != 0) {
            product.setDateCreated(productService.findProductById(product.getId()).getDateCreated());
        }
        productService.saveProduct(product);

        return "redirect:/control/products?category_id=" + product.getCategory().getId();

    }

    @GetMapping("/products/remove")
    public String removeProduct(@PathParam("product_id") long product_id, @PathParam("category_id") long category_id) {
        productService.removeProduct(product_id);

        return "redirect:/control/products?category_id=" + category_id;
    }

    @GetMapping("/categories")
    public String provideAdminCategories(Model model) {
        model.addAttribute("productCategory", new ProductCategory());
        model.addAttribute("categories", productService.findAllCategories());
    

        return "admin-category";
    }

    @PostMapping("/categories/save")
    public String saveCategory(@ModelAttribute("productCategory") ProductCategory category) {
        ProductCategory db_category = productService.findCategoriesById(category.getId());
        if (db_category != null) {
            category.setProducts(db_category.getProducts()); 
        } else {
            category.setProducts(new HashSet<>());
        }
        productService.saveCategory(category);
        
        return "redirect:/control/categories";
    }
    /*Remove if ther is no items in the category */
    @GetMapping("/categories/remove")
    public String removeCategory(@PathParam("category_id") long category_id) {
        productService.removeProductCategory(category_id);

        return "redirect:/control/categories";
    }







}
