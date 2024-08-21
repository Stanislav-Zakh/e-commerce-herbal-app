package dev.staniszak.spring.rest_jpa.interactive_webiste.repositories.custome_dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class CategoryRepository {

    private EntityManager manager;

    @Autowired
    public CategoryRepository(EntityManager manager) {
        this.manager = manager;
    }


    public List<ProductCategory> findAll() {

        TypedQuery<ProductCategory> query = manager.createQuery("From ProductCategory", ProductCategory.class);

        return query.getResultList();
    } 

    public ProductCategory findCategoryById(Long id) {

        return manager.find(ProductCategory.class, id);
    }

    public void saveCategory(ProductCategory category) {
        manager.merge(category);
    }

    public void deleteById(Long id) {

        ProductCategory category = manager.find(ProductCategory.class, id);

        if (category != null) {
          manager.remove(category);
        }
    }


}
