package com.changeplusplus.guesstheauthor.controller;


import com.changeplusplus.guesstheauthor.model.StatisticsForOneGame;
import com.changeplusplus.guesstheauthor.model.TweetsForOneGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import twitter4j.*;


@RestController
public class TweetGuessController {

    @Autowired
    private TweetsForOneGame tweetsForOneGame;

    @Autowired
    private StatisticsForOneGame statistics;


    @PostMapping("/startGame")
    public Status selectTwoAccountsAndPlay(@RequestParam String username1,
                                           @RequestParam String username2) throws TwitterException {
        tweetsForOneGame.initializeTweetsLists(username1, username2);

        return tweetsForOneGame.getRandomTweet();
    }


    @GetMapping("/playAnotherRound")
    public Status playAnotherRound() {
        return tweetsForOneGame.getRandomTweet();
    }


    @GetMapping("/lastGuessWasCorrect")
    public void updateStatisticsWithCorrectGuess() {
        statistics.incrementOverallAttempts();
        statistics.incrementCorrectAttempts();
    }


    @GetMapping("/lastGuessWasIncorrect")
    public void updateStatisticsWithIncorrectGuess() {
        statistics.incrementOverallAttempts();
    }




    @GetMapping("/statistics")
    public TemporaryStatisticsHolder getStatisticsAndEndGame() {
        return new TemporaryStatisticsHolder(statistics);
    }

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
