package mascotapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import mascotapp.service.HibernateDataService;

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
	public MascotApp() {
		service.createInitialData();
	}

	public static void main(String[] args) {
		SpringApplication.run(MascotApp.class, args);
	}
}
