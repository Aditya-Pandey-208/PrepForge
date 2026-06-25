package com.prepforge.prepforgeapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dsaProblems")
public class DsaProblem {

    @Id
    private String id;
    private String name;
    private String link;
    private String topic;
    private String difficulty;

    public DsaProblem() {
    }

    public DsaProblem(String name, String link, String topic, String difficulty) {
        this.name = name;
        this.link = link;
        this.topic = topic;
        this.difficulty = difficulty;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
    
    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
    
    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}