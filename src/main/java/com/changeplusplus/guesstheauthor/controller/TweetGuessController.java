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

//    @GetMapping("/")
//    public String getInitialPage() {
//        return "redirect:/static/index.html";
//    }


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

    @PostMapping("/MakeAGuess")
    public boolean guessAndShowCorrectAnswer(@RequestParam String usernameChosen, @RequestParam long tweetId) {
        statistics.incrementOverallAttempts();
        if (tweetsForOneGame.isGuessValid(usernameChosen, tweetId)) {
            statistics.incrementCorrectAttempts();
            return true;
        }
        return false;
    }


    @GetMapping("/statistics")
    public StatisticsForOneGame getStatisticsAndEndGame() {
        return statistics;
    }
}
