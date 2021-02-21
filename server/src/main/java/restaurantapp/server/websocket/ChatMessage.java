package restaurantapp.server.websocket;

public class ChatMessage {
    public String fromUserName;
    public String fromUserType;
    public String text;
    public String recipient;
    public String recipientType;

    public ChatMessage() {}
    public ChatMessage(String fromUserName, String fromUserType, String text, String recipient, String recipientType) {
        this.fromUserName = fromUserName;
        this.fromUserType = fromUserType;
        this.text = text;
        this.recipient = recipient;
        this.recipientType = recipientType;
    }

    public String getRecipientType() {
        return recipientType;
    }

    public void setRecipientType(String recipientType) {
        this.recipientType = recipientType;
    }

    public String getFromUserType() {
        return fromUserType;
    }

    public void setFromUserType(String fromUserType) {
        this.fromUserType = fromUserType;
    }

    public String getFromUserName() {
        return fromUserName;
    }

    public void setFromUserName(String fromUserName) {
        this.fromUserName = fromUserName;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }
}
