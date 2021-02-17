package restaurantapp.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import restaurantapp.server.models.Customer;
import restaurantapp.server.repositories.CustomerRepository;

import java.util.List;
import java.util.Optional;

@RestController
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> customers() {
        return new ResponseEntity<>(customerRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/customers")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) {
        List<Customer> existingCustomer = customerRepository.findByEmail(customer.getEmail());
        if (!existingCustomer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessage("Email already exists.", HttpStatus.BAD_REQUEST));
        }
        customerRepository.save(customer);
        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }


    @PostMapping("/customers/make-reservation")
    public ResponseEntity<?> loginCustomer(@RequestParam(name = "email") String email) {
        List<Customer> existingCustomer = customerRepository.findByEmail(email);
        if (existingCustomer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessage("Email does not exist.", HttpStatus.BAD_REQUEST));
        }
        Customer customer = existingCustomer.get(0);
        return ResponseEntity.status(HttpStatus.OK).body(customer);
    }

    @PostMapping("/customers/login")
    public ResponseEntity<?> loginCustomer(@RequestParam(name = "email") String email,
                                           @RequestParam(name = "password") String password) {
        List<Customer> existingCustomer = customerRepository.findByEmail(email);
        if (existingCustomer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessage("Email does not exist.", HttpStatus.BAD_REQUEST));
        }
        Customer customer = existingCustomer.get(0);
        if (!customer.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessage("Wrong password.", HttpStatus.BAD_REQUEST));
        }
        return ResponseEntity.status(HttpStatus.OK).body(customer);
    }

    @DeleteMapping("/customers")
    public ResponseEntity<Void> deleteCustomer(@RequestParam(name = "customerId") Long id) {
        if (id != null) {
            customerRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
