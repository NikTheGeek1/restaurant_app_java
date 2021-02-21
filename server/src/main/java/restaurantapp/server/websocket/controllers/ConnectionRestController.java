package restaurantapp.server.websocket.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import restaurantapp.server.websocket.ActiveUserManager;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
public class ConnectionRestController {

    @Autowired
    private ActiveUserManager activeUserManager;

    @PostMapping("/websck/user-connect")
    public String userConnect(HttpServletRequest request,
                              @RequestParam("userName") String userName,
                              @RequestParam("userType") String userType) {
        String remoteAddr = "";
        if (request != null) {
            remoteAddr = request.getHeader("Remote_Addr");
            if (StringUtils.isEmpty(remoteAddr)) {
                remoteAddr = request.getHeader("X-FORWARDED-FOR");
                if (remoteAddr == null || "".equals(remoteAddr)) {
                    remoteAddr = request.getRemoteAddr();
                }
            }
        }
        activeUserManager.add(userName, userType, remoteAddr);
        return remoteAddr;
    }

    @PostMapping("/websck/user-disconnect")
    public String userDisconnect(@RequestParam("userName") String userName) {
        System.out.println(userName + " DISCONNECTED");
        activeUserManager.remove(userName);
        return "disconnected";
    }

    @GetMapping("/websck/active-users-except/{userName}")
    public HashMap<String, HashMap<String, String>> getActiveUsersEsceptCurrentUser(@PathVariable String userName) {
        return activeUserManager.getActiveUsersExceptCurrentUser(userName);
    }

    @GetMapping("/websck/get-admin")
    public HashMap<String, HashMap<String, String>> getAdmin() {
        return activeUserManager.getAdmin();
    }
}
