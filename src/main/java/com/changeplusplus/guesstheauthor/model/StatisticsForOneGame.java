package com.changeplusplus.guesstheauthor.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

public class StatisticsForOneGame {
    private int overallAttempts = 0;
    private int correctAttempts = 0;

    public void incrementOverallAttempts() {
        overallAttempts++;
    }

    public void incrementCorrectAttempts() {
        correctAttempts++;
    }

    public int getOverallAttempts() {
        return overallAttempts;
    }

    public int getCorrectAttempts() {
        return correctAttempts;
    }
}
