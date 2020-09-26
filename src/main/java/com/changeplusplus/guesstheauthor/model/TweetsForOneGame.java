package com.changeplusplus.guesstheauthor.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import twitter4j.*;

import java.util.Iterator;
import java.util.List;
import java.util.Random;


public class TweetsForOneGame {
    private List<Status> tweetsFromUsername1;
    private List<Status> tweetsFromUsername2;

    public Status getRandomTweet() {
        Random rand = new Random();
        int whatUsernameToSelect = rand.nextInt(2) + 1;

        if(whatUsernameToSelect == 1) {
            int whatTweetToSelect = rand.nextInt(tweetsFromUsername1.size());
            return tweetsFromUsername1.get(whatTweetToSelect);
        }
        else {
            int whatTweetToSelect = rand.nextInt(tweetsFromUsername2.size());
            return tweetsFromUsername2.get(whatTweetToSelect);
        }
    }

    public void initializeTweetsLists(String username1, String username2) throws TwitterException {
        TwitterFactory twitterFactory = new TwitterFactory();
        Twitter twitterInstance = twitterFactory.getInstance();

        Paging pagingUsername1 = new Paging(1, 200);
        tweetsFromUsername1 = twitterInstance.getUserTimeline(username1, pagingUsername1);

        Paging pagingUsername2 = new Paging(1, 200);
        tweetsFromUsername2 = twitterInstance.getUserTimeline(username2, pagingUsername2);

        removeRepliesAndTweetsWithLinks();
    }


    public boolean isGuessValid(String guessedUsername, long tweetId) {
        for(Status tweet: tweetsFromUsername1) {
            if(tweet.getId() == tweetId) {
                if(tweet.getUser().getScreenName() == guessedUsername) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }

        for(Status tweet: tweetsFromUsername2) {
            if(tweet.getId() == tweetId) {
                if(tweet.getUser().getScreenName() == guessedUsername) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }

        return false;
    }

    // removing any links
    private void removeRepliesAndTweetsWithLinks() {
        Iterator<Status> itr1 = tweetsFromUsername1.iterator();
        while (itr1.hasNext())
        {
            Status status = itr1.next();
            if (status.getInReplyToScreenName() != null || status.getText().contains("http") || status.isRetweet()) {
                itr1.remove();
            }
        }

        Iterator<Status> itr2 = tweetsFromUsername2.iterator();
        while (itr2.hasNext())
        {
            Status status = itr2.next();
            if (status.getInReplyToScreenName() != null || status.getText().contains("http") || status.isRetweet()) {
                itr2.remove();
            }
        }
    }
}
