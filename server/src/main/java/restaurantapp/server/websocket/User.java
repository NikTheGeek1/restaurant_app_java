package restaurantapp.server.websocket;

import java.security.Principal;

public class User implements Principal {

    String name;
    String userType;

    public User(String name, String userType) {
        this.name = name;
        this.userType = userType;
    }

    @Override
    public String getName() {
        return name;
    }
}
