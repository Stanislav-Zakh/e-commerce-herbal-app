package dev.staniszak.spring.rest_jpa.interactive_webiste.dto;

public class PurchaseResponse {

    private String uid;

    public PurchaseResponse(String uid) {
        this.uid = uid;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

}
