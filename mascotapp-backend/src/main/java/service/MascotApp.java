package service;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import service.HibernateDataService;

@Configuration
@SpringBootApplication
@ComponentScan
@EnableAutoConfiguration(exclude={
	    DataSourceAutoConfiguration.class,
	    DataSourceTransactionManagerAutoConfiguration.class,
	    HibernateJpaAutoConfiguration.class
	})

public class MascotApp {
	
	HibernateDataService service = new HibernateDataService();
	
	public MascotApp() throws IOException {
		service.createInitialData();
	}

	public static void main(String[] args) {
		SpringApplication.run(MascotApp.class, args);
	}
}
