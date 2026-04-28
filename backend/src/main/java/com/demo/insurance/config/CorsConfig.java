package com.demo.insurance.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("*")   // Allow all origins for development
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
        // For production, replace "*" with specific origins like "http://172.25.50.77:3000"
    }
}