package dev.staniszak.spring.rest_jpa.interactive_webiste.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "addresses")
@Getter
@Setter
public class Address {

    @Id
    @Column(name="id") 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="city") 
    private String city;

    @Column(name="country") 
    private String country;

    @Column(name="state") 
    private String state;

    @Column(name="street") 
    private String street;

    @Column(name="zip_code") 
    private String zipCode;

    @OneToOne(mappedBy = "billingAddress") 
    private Order order;

    public Address() {
    }

     

}
