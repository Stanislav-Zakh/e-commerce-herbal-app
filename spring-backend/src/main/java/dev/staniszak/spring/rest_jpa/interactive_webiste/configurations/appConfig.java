package dev.staniszak.spring.rest_jpa.interactive_webiste.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
CORS configuration that allows cross origin requests from the allowed origins.   
 */

@Configuration
public class appConfig implements WebMvcConfigurer {

    @Value("${origins.allowed}")
    private String[] allowedOrigins; 

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/api/**").allowedOrigins(allowedOrigins).allowedMethods("GET", "POST")
        .allowedHeaders("*").allowCredentials(true);
        corsRegistry.addMapping("/control/**").allowedOrigins(allowedOrigins);
        WebMvcConfigurer.super.addCorsMappings(corsRegistry);
    }



}
