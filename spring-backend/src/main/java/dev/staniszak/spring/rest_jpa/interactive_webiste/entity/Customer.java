package dev.staniszak.spring.rest_jpa.interactive_webiste.entity;

import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
 
@Entity
@Table(name="customers")
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="email")
    private String email;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private List<Order> orders =  new LinkedList<>();

    public Customer() {
    }


    public void add(Order order) {

        if (order != null) {

            if (orders == null) {
                orders = new LinkedList<>(); 
            }
            orders.add(order);
            order.setCustomer(this);
        }
    }
}
