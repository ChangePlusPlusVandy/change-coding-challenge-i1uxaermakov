package com.changeplusplus.guesstheauthor.controller;

import com.changeplusplus.guesstheauthor.model.StatisticsForOneGame;
import com.changeplusplus.guesstheauthor.model.TweetsForOneGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import twitter4j.*;

// The class that represents the endpoints to the backend server. Most of the
// communication between frontend and backend happens in JSON format.
@RestController
public class TweetGuessController {

    // The object that holds tweets from 2 accounts for the current httpSession
    @Autowired
    private TweetsForOneGame tweetsForOneGame;

    // The object that holds statistics on the games played in the current httpSession
    @Autowired
    private StatisticsForOneGame statistics;

    // The endpoint used to start the game given the 2 usernames and send user
    // the first tweet to play with
    @PostMapping("/startGame")
    public Status selectTwoAccountsAndPlay(@RequestParam String username1,
                                           @RequestParam String username2) throws TwitterException {

        tweetsForOneGame.initializeTweetsLists(username1, username2);

        return tweetsForOneGame.getRandomTweet();
    }

    // The endpoint used to get additional tweets after the first one to
    // continue playing
    @GetMapping("/playAnotherRound")
    public Status playAnotherRound() {
        return tweetsForOneGame.getRandomTweet();
    }


    // The endpoint used to update statistics of the current playing session
    // when a user made a correct guess
    @GetMapping("/lastGuessWasCorrect")
    public void updateStatisticsWithCorrectGuess() {
        statistics.incrementOverallAttempts();
        statistics.incrementCorrectAttempts();
    }


    // The endpoint used to update statistics of the current playing session
    // when a user made an incorrect guess
    @GetMapping("/lastGuessWasIncorrect")
    public void updateStatisticsWithIncorrectGuess() {
        statistics.incrementOverallAttempts();
    }


    // The endpoint used to get statistics about the games played during the
    // current session
    @GetMapping("/statistics")
    public TemporaryStatisticsHolder getStatisticsAndEndGame() {
        return new TemporaryStatisticsHolder(statistics);
    }


    // Temporary class used to store the statistics when sending them to user.
    // The class was needed because Spring Framework doesn't allow the
    // serialization (conversion to JSON in this case) of the objects that
    // are tied to session and are currently under management by the framework
    class TemporaryStatisticsHolder {
        private long overallAttempts;
        private long correctAttempts;

        public TemporaryStatisticsHolder(StatisticsForOneGame statisticsForOneGame) {
            overallAttempts = statisticsForOneGame.getOverallAttempts();
            correctAttempts = statisticsForOneGame.getCorrectAttempts();
        }

        public long getOverallAttempts() {
            return overallAttempts;
        }

        public void setOverallAttempts(long overallAttempts) {
            this.overallAttempts = overallAttempts;
        }

        public long getCorrectAttempts() {
            return correctAttempts;
        }

        public void setCorrectAttempts(long correctAttempts) {
            this.correctAttempts = correctAttempts;
        }
    }
}
