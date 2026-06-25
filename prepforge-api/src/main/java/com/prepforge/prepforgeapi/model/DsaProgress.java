package com.prepforge.prepforgeapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dsaProgress")
public class DsaProgress {

    @Id
    private String id;
    private String username;
    private String problemId;

    public DsaProgress() {
    }

    public DsaProgress(String username, String problemId) {
        this.username = username;
        this.problemId = problemId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProblemId() {
        return problemId;
    }

    public void setProblemId(String problemId) {
        this.problemId = problemId;
    }
}