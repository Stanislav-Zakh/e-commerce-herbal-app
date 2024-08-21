package dev.staniszak.spring.rest_jpa.interactive_webiste.configurations;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
//import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

/*
Spring Security Configurer that secures all endpoints under /control
Basically hides all database editing interface 
provided by this platform under authentication and autherithation.

Also configures or disables CSRF protection.
 */


@Configuration
@EnableWebSecurity
public class appSecurityConfig {

    @Bean
    public UserDetailsManager detailsManager(DataSource dataSource) {
        JdbcUserDetailsManager manager =  new JdbcUserDetailsManager(dataSource);

        // Point detailsManager to the custome tables and data
        manager.setUsersByUsernameQuery("select username, password, enabled from stuff where username=?");
        manager.setAuthoritiesByUsernameQuery("select username, role from roles where username=?");

        return manager;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http.authorizeHttpRequests( auth -> auth
                .requestMatchers("/control/**").hasRole("ADMIN") // Secure endpoints under /control/
                .anyRequest().permitAll()) // Allow all other requests
                .formLogin(config -> config.permitAll()); // Enable form-based authentication with default login form

            /* Disable CSRF protection when testing 
            CookieCsrfTokenRepository cookie = CookieCsrfTokenRepository.withHttpOnlyFalse();
            cookie.setCookieName("MY-COOL-XSRF-TOKEN");
            cookie.setHeaderName("MY-COOL-X-XSRF-TOKEN");  
            cookie.setCookiePath("/");   
            cookie.setCookieCustomizer(c -> c.secure(true));
            http.csrf(cust -> cust.csrfTokenRepository(cookie).csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()));  
            */    
            http.csrf(c -> c.disable()); // csrf should be disabled when testing
        return http.build();
    }






}
