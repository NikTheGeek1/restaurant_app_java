package restaurantapp.server.models.user;

public class Admin extends User {

    public Admin() { }

    public Admin(String email, String password, String name) {
        super("admin@admin.com", password, "Admin");
    }

}
