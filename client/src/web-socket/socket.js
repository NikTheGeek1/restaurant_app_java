import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient;
export const initSocket = () => {
    const socket = new SockJS('http://localhost:8080/chat');
    stompClient = Stomp.over(socket);
    socket.onopen = function() {
        console.log('open');
      };
    return stompClient;
};
export const getSocket = () => {
    if (!stompClient) {
        throw new Error('Socket.io is not initialised');
    }
    return stompClient;
}