package dev.staniszak.spring.rest_jpa.interactive_webiste.dto;

import java.util.List;

import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Address;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Customer;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Order;
import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.OrderItem;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseDTO {

    private Customer customer;
    private Order order;
    private Address billingAddress;
    private List<OrderItem> orderItems;

    public PurchaseDTO(Customer customer, Order order, Address billingAddress, List<OrderItem> orderItems) {
        this.customer = customer;
        this.order = order;
        this.billingAddress = billingAddress;
        this.orderItems = orderItems;
    } 

    

    



}
