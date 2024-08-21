package dev.staniszak.spring.rest_jpa.interactive_webiste.repositories.jpa_data_api;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Product;

public interface ProductRepositoryData extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long id);

    Page<Product> findByCategoryId(Long id, Pageable page);

    List<Product> findByNameContainingOrDescriptionContaining(String keyword_1, String keyword_2);
    // better version with pagination and only with name search
    Page<Product> findByNameContaining(String keyword, Pageable page);

}
