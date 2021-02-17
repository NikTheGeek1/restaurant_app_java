package restaurantapp.server.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import restaurantapp.server.models.Admin;

@RestController
public class AdminController {


    @PostMapping("/admin/login")
    public ResponseEntity<?> admin(@RequestParam(name = "name") String name,
            @RequestParam(name = "password") String password) {
        Admin admin = new Admin(name);
        if (!admin.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessage("Wrong password.", HttpStatus.BAD_REQUEST));
        }
        return ResponseEntity.status(HttpStatus.OK).body(admin);
    }
}
