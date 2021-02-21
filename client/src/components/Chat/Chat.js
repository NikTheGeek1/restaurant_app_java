import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { initSocket } from '../../web-socket/socket';
import { getSocket } from '../../web-socket/socket';
import './Chat.css';
import { websckLogUserIn, getActiveUsersExceptMe, getAdmin, disconnectUser } from '../../services/websocket-services';
import ChatWindow from '../ChatWindow/ChatWindow';

let socket;
const Chat = () => {
    const customerObj = useSelector(state => state.userDetails);
    const adminObj = useSelector(state => state.adminDetails);

    const [whoAmI, setWhoAmI] = useState({});
    const [incomingMessage, setIncomingMsg] = useState({});

    const [whoIsAdmin, setWhoIsAdmin] = useState('');
    const [whoAreTheOther, setWhoAreTheOther] = useState([]);

    useEffect(() => {
        initSocket();
        socket = getSocket();
        if (customerObj.isLoggedIn) {
            setWhoAmI({ userType: "CUSTOMER", obj: customerObj.userObj });
        }
        if (adminObj.isLoggedIn) {
            setWhoAmI({ userType: "ADMIN", obj: adminObj.adminObj });
        }
    }, [adminObj, customerObj]);

    const amIAdmin = () => {
        return whoAmI.userType === "ADMIN";
    };
    
    const convertUserObjToList = (userObj) => {
        const userNames = Object.keys(userObj);
        return userNames.map(userName => ({userName, userType: userObj[userName].userType}));
    };

    const isAdminStillIn = (userObj) => {
        const userList = convertUserObjToList(userObj);
        for (const user of userList) {
            if (user.userType === "ADMIN") {
                return user;
            }
        }
        return null;
    };

    useEffect(() => {
        if (!Object.keys(whoAmI).length) return;
        let greetingSubscription;
        let broadcastSub;
        let activeUsersSubscription;
        // socket.debug = f => f;
        websckLogUserIn(whoAmI.obj.name, whoAmI.userType,
            sucResp => socket.connect({ username: whoAmI.obj.name }, (frame) => {
                activeUsersSubscription = socket.subscribe('/topic/active', (userObjectsUnParsed) => {
                    if (!userObjectsUnParsed) return;
                    const userObjectsParsed = JSON.parse(userObjectsUnParsed.body);
                    if (amIAdmin()) {
                        delete userObjectsParsed[whoAmI.obj.name];
                        updateActiveUsers(userObjectsParsed);
                    } else {
                        const admin = isAdminStillIn(userObjectsParsed);
                        if (admin){
                            return setWhoIsAdmin(admin);
                        } 
                        setWhoIsAdmin({});
                    }
                });

                greetingSubscription = socket.subscribe('/user/queue/messages', (message) => {
                    const parsedBody = JSON.parse(message.body);
                    parsedBody && setIncomingMsg(parsedBody);
                }, { id: whoAmI.obj.name });
                if (amIAdmin()) {
                    getActiveUsersExceptMe(whoAmI.obj.name, sucResponse => updateActiveUsers(sucResponse));
                } else {
                    getAdmin(succResp => updateAdmin(succResp))
                }
            },  (err) => console.log('error' + err)));
        
        window.addEventListener("beforeunload", beforeBrowserCloses);

        return () => {
            greetingSubscription && greetingSubscription.unsubscribe();
            broadcastSub && broadcastSub.unsubscribe();
            activeUsersSubscription && activeUsersSubscription.unsubscribe();
            disconnectUser(whoAmI.obj.name, () => socket.disconnect());
            window.removeEventListener("beforeunload", beforeBrowserCloses);
        };
    }, [whoAmI]);

    const beforeBrowserCloses = (e) => {
        disconnectUser(whoAmI.obj.name, () => socket.disconnect());
    };

    const updateAdmin = response => {
        if (!response) {
            return setWhoIsAdmin({});
        }
        const adminName = Object.keys(response)[0];
        setWhoIsAdmin({ userName: adminName, userType: "ADMIN" });
    };

    const updateActiveUsers = (userObj) => {
        const userList = convertUserObjToList(userObj);
        const updatedOthersState = [...whoAreTheOther];
        updatedOthersState.push(...userList);
        setWhoAreTheOther(updatedOthersState);
    };



    let chatWindowsJSX;
    if (amIAdmin()) {
        chatWindowsJSX = whoAreTheOther.map((customer, idx) => {
            const isTheProperChat = whoAmI.obj.name === incomingMessage.recipient &&
                customer.userName === incomingMessage.fromUserName;
            return (
                <ChatWindow
                    key={customer + idx}
                    socket={socket}
                    me={whoAmI}
                    other={customer}
                    incomingMessage={isTheProperChat ? incomingMessage : {}}
                />
            );
        })
    } else {
        chatWindowsJSX = <ChatWindow
            other={whoIsAdmin}
            me={whoAmI}
            socket={socket}
            incomingMessage={incomingMessage}
        />;
    }



    return (
        <div className="chat-div-container">
            {chatWindowsJSX}
        </div>
    );
};

export default Chat;