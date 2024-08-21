package dev.staniszak.spring.rest_jpa.interactive_webiste.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dev.staniszak.spring.rest_jpa.interactive_webiste.dto.PurchaseDTO;
import dev.staniszak.spring.rest_jpa.interactive_webiste.dto.PurchaseResponse;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Customer;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Order;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.OrderItem;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Product;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.ProductCategory;
import dev.staniszak.spring.rest_jpa.interactive_webiste.repositories.custome_dao.CategoryRepository;
import dev.staniszak.spring.rest_jpa.interactive_webiste.repositories.jpa_data_api.CustomerRepositoryData;
import dev.staniszak.spring.rest_jpa.interactive_webiste.repositories.jpa_data_api.ProductRepositoryData;
import jakarta.transaction.Transactional;


/* 
 Service Layer. 
 Works as an intermidiary beatwean Controllers and Repositories.
 Depends on the Product, Category and Customer repositories.
 Created to consolidate all the related repositories together, 
 define interface that works regardless of repository implementation,
 provides Controller only with the allowed/neccassery queries from the JPARepositories.
 */

@Service
public class ProductService {

    private ProductRepositoryData productRepository;
    private CategoryRepository categoryRepository;
    private CustomerRepositoryData customerRepository;


    public ProductService(ProductRepositoryData productRepository, CategoryRepository categoryRepository,
                          CustomerRepositoryData customerRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.customerRepository = customerRepository;
    }

    /////////////////////// Product Queries ////////////////////////////

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> findProductsByCategoryId(Long id) {
        return productRepository.findByCategoryId(id);
    }

    public Page<Product> findProductsByCategoryIdWithPagination(Long id, Pageable page) {
        return productRepository.findByCategoryId(id, page);
    }

    public List<Product> findByNameOrDescriptionKeyword(String keyword) {
        return this.productRepository.findByNameContainingOrDescriptionContaining(keyword, keyword);
    }

    public Page<Product> findByNameKeywordWithPagination(String keyword, Pageable page) {
        return this.productRepository.findByNameContaining(keyword, page);
    }

    public Product findProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {
            return product.get();
        } else {
            throw new RuntimeException("No Product with such id");
        }
    }

    @Transactional
    public Product createProduct(Product product) {
        product.setId(0);
        return productRepository.save(product);
    }

    @Transactional
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public void removeProduct(Long id) {

        productRepository.deleteById(id);
    }

    /////////////////////// Category Queries ////////////////////////////

    public List<ProductCategory> findAllCategories() {

        return categoryRepository.findAll();
    }

    public ProductCategory findCategoriesById(Long id) {

        return categoryRepository.findCategoryById(id);
    }

    @Transactional
    public void saveCategory(ProductCategory category) {
        categoryRepository.saveCategory(category);
    }

    @Transactional
    public void removeProductCategory(Long id) {

        if(productRepository.findByCategoryId(id).size() == 0) {
            categoryRepository.deleteById(id);  
        }
    }


    /////////////////////// Purchase Query ////////////////////////////

    public PurchaseResponse savePurchase(PurchaseDTO purchase) {

        String purchase_uid = UUID.randomUUID().toString();

        Order order = purchase.getOrder();
        order.setOrderUID(purchase_uid);

        order.setBillingAddress(purchase.getBillingAddress());

        List<OrderItem> items = purchase.getOrderItems();
        
        items.forEach(item ->  order.add(item));

        Customer customer = purchase.getCustomer();
        // retrive existing customer from repository by email
        Customer rep_customer = this.customerRepository.findByEmail(customer.getEmail());

        if (rep_customer != null) { 
            customer = rep_customer; // <- if it exist, use it to save order.
        } 
        customer.add(order);
        this.customerRepository.save(customer);

        return new PurchaseResponse(purchase_uid);
    }
}
