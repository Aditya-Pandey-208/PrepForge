package com.prepforge.prepforgeapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dsaProgress")
public class DsaProgress {

    @Id
    private String id;
    private String userEmail;
    private String problemId;

    public DsaProgress() {
    }

    public DsaProgress(String userEmail, String problemId) {
        this.userEmail = userEmail;
        this.problemId = problemId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getProblemId() {
        return problemId;
    }

    public void setProblemId(String problemId) {
        this.problemId = problemId;
    }
}