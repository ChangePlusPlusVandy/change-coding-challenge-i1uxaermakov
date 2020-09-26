package com.changeplusplus.guesstheauthor.model;

// The class used to hold statistics about the games played in the current session
// The methods and fields in the class are self-explanatory
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
