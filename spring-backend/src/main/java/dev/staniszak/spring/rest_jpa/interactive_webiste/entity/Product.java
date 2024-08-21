package dev.staniszak.spring.rest_jpa.interactive_webiste.entity;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.hateoas.RepresentationModel;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Entity
@Table(name = "product")
@Getter
@Setter
@ToString
public class Product extends RepresentationModel<Product>  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private int unitPrice;

    @Column(name = "image_url")
    private String imageURL;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    @CreationTimestamp
    @Column(name = "date_created")
    private Date dateCreated;

    @UpdateTimestamp
    @Column(name = "last_updated")
    private Date lastUpdated;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private ProductCategory category;

    public Product() {
    }

    public Product(String name, String description, int unitPrice, 
                   String imageURL, int unitsInStock) {
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageURL = imageURL;
        this.unitsInStock = unitsInStock;
    }

    


    

}
