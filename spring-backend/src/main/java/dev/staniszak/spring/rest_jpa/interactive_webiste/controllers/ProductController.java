package dev.staniszak.spring.rest_jpa.interactive_webiste.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.staniszak.spring.rest_jpa.interactive_webiste.customAssemblers.ProductModelAssembler;
import dev.staniszak.spring.rest_jpa.interactive_webiste.dto.PurchaseDTO;
import dev.staniszak.spring.rest_jpa.interactive_webiste.dto.PurchaseResponse;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Product;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.ProductCategory;
import dev.staniszak.spring.rest_jpa.interactive_webiste.services.ProductService;

/*
Main Rest Controller of application.  
Receives get request for products and product categories.
Respondes in JSON with product or category objects + pagination information (implemeted using Spring HATEOAS).    
Also receives a POST request on the /checkout edpoint with Purchase Information, and returns PurchaseResponse.    
(for admin pages Controller, see AdminController).    
 */

@RestController
@RequestMapping("/api")
public class ProductController {

    private ProductService service;
    private PagedResourcesAssembler<Product> pageAssembler;
    private ProductModelAssembler assembler;

    public ProductController(ProductService service, PagedResourcesAssembler<Product> pageAssembler, ProductModelAssembler assembler) {
        this.service = service;
        this.pageAssembler = pageAssembler;
        this.assembler = assembler;
    }
   
    @GetMapping("/products")
    public List<Product> getAllProducts() {

        return service.findAllProducts(); 
    }
   
    @GetMapping("/products/{id}") 
    public Product getProductById(@PathVariable Long id ) {
        

        return service.findProductById(id); 
    }

    // remove if not needed
    @GetMapping("/products/search/byCategory/{category_id}")
    public List<Product> getProductsByCategoryId(@PathVariable("category_id") Long id) {
        return service.findProductsByCategoryId(id);
    }

    @GetMapping("/products/search/byCategory/withPagination/{category_id}")
    public ResponseEntity<PagedModel<EntityModel<Product>>> getProductsByCategoryIdWithPagination(@PathVariable("category_id") Long id,
                                                               Pageable page) {
        // Pageable page = PageRequest.of(number, size);
        Page<Product> products = service.findProductsByCategoryIdWithPagination(id, page);
        
        return ResponseEntity.ok(pageAssembler.toModel(products, assembler));
    }

    @GetMapping("/products/search/byKeyword/{keyword}")
    public List<Product> getProductsByKeyword(@PathVariable("keyword") String keyword) {
        return service.findByNameOrDescriptionKeyword(keyword);
    }

    @GetMapping("/products/search/byKeyword/withPagination/{keyword}")
    public ResponseEntity<PagedModel<EntityModel<Product>>> 
           getProductsByKeywordWithPagination(@PathVariable("keyword") String keyword,
                                              Pageable page) {                   
        Page<Product> products = service.findByNameKeywordWithPagination(keyword, page);

        return ResponseEntity.ok(pageAssembler.toModel(products, assembler));
    }


    @GetMapping("/categories")
    public List<ProductCategory> findALLCategory() {
        return service.findAllCategories();
    } 

    @PostMapping("/checkout")
    public PurchaseResponse receivePurchase(@RequestBody PurchaseDTO purchase) {

        return service.savePurchase(purchase);
    } 
}
