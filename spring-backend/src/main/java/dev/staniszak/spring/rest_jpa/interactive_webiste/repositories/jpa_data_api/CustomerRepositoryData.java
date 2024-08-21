package dev.staniszak.spring.rest_jpa.interactive_webiste.repositories.jpa_data_api;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.staniszak.spring.rest_jpa.interactive_webiste.entity.Customer;

public interface CustomerRepositoryData extends JpaRepository<Customer, Long> {

    Customer findByEmail(String email);

}
