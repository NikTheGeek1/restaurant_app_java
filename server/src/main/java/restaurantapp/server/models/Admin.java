package restaurantapp.server.models;

public class Admin  {

    private String password;
    private String name;

    public Admin() { }

    public Admin(String name) {
        this.password = "12345";
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
