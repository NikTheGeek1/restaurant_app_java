import { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';

const TOGGLECHAT = {
    open: false,
    close: true
};

const ChatWindow = ({ me, other, socket, incomingMessage  }) => {
    const [isLastUnread, setIsLastUnread] = useState(false);

    const [showChat, setShowChat] = useState(false);
    const [messagesHistory, setMessagesHistory] = useState([]);
    const [message, setMessage] = useState('');

    const messagesHistoryRef = useRef(messagesHistory);
    const showChatRef = useRef(showChat);
    const scrollRef = useRef();

    const updateMessageHistory = (senderUserType, senderName, msg, read) => {
        const newMsg = {senderUserType, senderName, msg, read};
        const updatedMessages = [...messagesHistory];
        updatedMessages.push(newMsg);
        setMessagesHistory(updatedMessages);
    };

    useEffect(() => {
        if (!Object.keys(incomingMessage).length) return;
        updateMessageHistory(incomingMessage.fromUserType, incomingMessage.fromUserName, incomingMessage.text, false);
    }, [incomingMessage]);

    useEffect(() => {
        showChatRef.current = showChat;
    }, [showChat]);

    useEffect(() => {
        messagesHistoryRef.current = messagesHistory;
    }, [messagesHistory]);

    useEffect(() => {
        if (messagesHistory.length && !messagesHistory[messagesHistory.length - 1].read) {
            setIsLastUnread(true);
        }
    }, [messagesHistory]);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    });

    const pressEnderHandler = e => {
        if (e.key === 'Enter') {
            sendMsgHandler();
        }
    };

    const toggleChatHandler = type => {
        if (type === 'close') {
            // read all messages
            const updatedHist = [...messagesHistory];
            updatedHist.forEach(msg => msg.read = true);
            setIsLastUnread(false);
            setMessagesHistory(updatedHist);
        }
        setShowChat(TOGGLECHAT[type]);
    };

    const messagesJSX = messagesHistory.map((msg, i) => {
        const msgClass = msg.senderUserType === me.userType ? 'msg-me' : 'msg-other';
        return (
            <div className={msgClass} key={`${i}-${msg.msg}-${msg.sender}`}>{msg.msg}</div>
        );
    });


    const sendMsgHandler = () => {
        if (message.trim().length === 0) {
            return;
        }
        updateMessageHistory(me.userType, me.obj.name, message, true);
        setMessage('');
        socket.send("/app/chat", { 'sender': me.userName },
            JSON.stringify({ 'fromUserName': me.obj.name, 'fromUserType': me.userType, 'text': message, 'recipient': other.userName, 'recipientType': other.userType}));
    };
    let chatJSX = (
        <div className="chat-container-minimised">
            <div className="chat-header" onClick={() => Object.keys(other).length && toggleChatHandler('close')}>
                {!Object.keys(other).length ? <div className="chat-opponent-name">Admin unavailable</div> : <div className="chat-opponent-name">Chat {other.userName}</div>}
                {isLastUnread && <div className="non-read-message"><div>!</div></div>}
                <div className="chat-maximise">◻️</div>
            </div>
        </div>
    );

    if (showChat && Object.keys(other).length) {
        chatJSX = (
            <div className="chat-container-maximised">
                <div className="chat-header" onClick={() => toggleChatHandler('open')}>
                    <div className="chat-opponent-name">{other.userName}</div>
                    <div className="chat-minimize" ></div>
                </div>
                <div className="chat-body" ref={scrollRef}>
                    {messagesJSX}
                </div>
                <div className="chat-footer">
                    <div className="chat-input-div">
                        <textarea className="chat-input" type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={pressEnderHandler}> </textarea>
                    </div>
                    <div className="chat-send" onClick={sendMsgHandler} >
                        ⌲
                    </div>
                </div>
            </div>
        );
    }
    return chatJSX;
};

export default ChatWindow;