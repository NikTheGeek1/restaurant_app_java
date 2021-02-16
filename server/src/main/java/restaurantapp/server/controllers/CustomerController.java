package restaurantapp.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import restaurantapp.server.models.Customer;
import restaurantapp.server.repositories.CustomerRepository;

import java.util.List;

@RestController
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> customers() {
        return new ResponseEntity<>(customerRepository.findAll(), HttpStatus.OK);
    }
}
