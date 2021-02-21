package restaurantapp.server.websocket;

import org.springframework.stereotype.Component;
import restaurantapp.server.websocket.interfaces.ActiveUserChangeListener;

import java.util.*;
import java.util.concurrent.*;

@Component
public class ActiveUserManager {

    private final HashMap<String, HashMap<String, String>> users;
    private final List<ActiveUserChangeListener> listeners;
    private final ThreadPoolExecutor notifyPool;

    private ActiveUserManager() {
        users = new HashMap<>();
        listeners = new CopyOnWriteArrayList<>();
        notifyPool = new ThreadPoolExecutor(1, 5, 10, TimeUnit.SECONDS, new ArrayBlockingQueue<>(100));
    }

    public void add(String userName, String userType,  String remoteAddress) {
        HashMap<String, String> userHash = new HashMap<>();
        userHash.put("userType", userType);
        userHash.put("remoteAddr", remoteAddress);
        users.put(userName, userHash);
        notifyListeners();
    }

    public void remove(String userName) {
        users.remove(userName);
        notifyListeners();
    }

    public HashMap<String, HashMap<String, String>> getAll() {
        return users;
    }

    public HashMap<String, HashMap<String, String>> getActiveUsersExceptCurrentUser(String userName) {
        HashMap<String, HashMap<String, String>> usersCloned = new HashMap<>(users);
        usersCloned.remove(userName);
        return usersCloned;
    }


    public void registerListener(ActiveUserChangeListener listener) {
        listeners.add(listener);
    }

    public void removeListener(ActiveUserChangeListener listener) {
        listeners.remove(listener);
    }

    public HashMap<String, HashMap<String, String>> getAdmin() {
        for(String user : users.keySet()) {
            if (users.get(user).get("userType").equals("ADMIN")) {
                HashMap<String, HashMap<String, String>> admin = new HashMap<>();
                admin.put(user, users.get(user));
                return admin;
            }
        }
        return null;
    }

    private void notifyListeners() {
        notifyPool.submit(() -> listeners.forEach(ActiveUserChangeListener::notifyActiveUserChange));
    }

}
