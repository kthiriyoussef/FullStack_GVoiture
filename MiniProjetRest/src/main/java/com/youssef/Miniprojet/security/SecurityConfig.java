package com.youssef.Miniprojet.security;
import java.util.Arrays;
import java.util.Collections;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import
org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	
	@Bean
	 public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf().disable()
		.sessionManagement()
		 .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
		 .cors().configurationSource(new CorsConfigurationSource() {
			 @Override
			 public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
			 CorsConfiguration config = new CorsConfiguration();

			config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
			 config.setAllowedMethods(Collections.singletonList("*"));
			 config.setAllowCredentials(true);
			 config.setAllowedHeaders(Collections.singletonList("*"));
			 config.setExposedHeaders(Arrays.asList("Authorization"));
			 config.setMaxAge(3600L);
			 return config;
			 }
			 }).and()
		 

		 .authorizeHttpRequests()
		 .requestMatchers("/login").permitAll()
		 //consulter tous les produits
		 .requestMatchers("/api/all/**").hasAnyAuthority("ADMIN","USER")
		 //consulter un produit par son id
		 .requestMatchers(HttpMethod.GET,"/api/getbyid/**")
		.hasAnyAuthority("ADMIN","USER")

		//ajouter un nouveau produit
		.requestMatchers(HttpMethod.POST,"/api/addVoit/**").hasAnyAuthority("ADMIN")
		//modifier un produit
		.requestMatchers(HttpMethod.PUT,"/api/updateVoit/**").hasAuthority("ADMIN")
		//supprimer un produit
		.requestMatchers(HttpMethod.DELETE,"/api/delVoit/**").hasAuthority("ADMIN")
		.anyRequest().authenticated().and()
		 .addFilterBefore(new JWTAuthorizationFilter(),BasicAuthenticationFilter.class);
		return http.build();
	}

}
