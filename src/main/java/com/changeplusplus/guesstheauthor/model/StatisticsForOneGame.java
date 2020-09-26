package com.changeplusplus.guesstheauthor.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.io.Serializable;

public class StatisticsForOneGame {
    private long overallAttempts;
    private long correctAttempts;

    public StatisticsForOneGame(long overallAttempts, long correctAttempts) {
        this.overallAttempts = overallAttempts;
        this.correctAttempts = correctAttempts;
    }

    public void incrementOverallAttempts() {
        overallAttempts++;
    }

    public void incrementCorrectAttempts() {
        correctAttempts++;
    }

    public long getOverallAttempts() {
        return overallAttempts;
    }

    public long getCorrectAttempts() {
        return correctAttempts;
    }


    public void setOverallAttempts(long overallAttempts) {
        this.overallAttempts = overallAttempts;
    }

    public void setCorrectAttempts(long correctAttempts) {
        this.correctAttempts = correctAttempts;
    }


}
