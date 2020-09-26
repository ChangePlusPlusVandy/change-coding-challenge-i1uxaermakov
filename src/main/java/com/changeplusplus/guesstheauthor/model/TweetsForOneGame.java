package com.changeplusplus.guesstheauthor.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import twitter4j.*;

import java.util.Iterator;
import java.util.List;
import java.util.Random;

// The class used to store the tweets for the current game
public class TweetsForOneGame {
    private List<Status> tweetsFromUsername1;
    private List<Status> tweetsFromUsername2;

    // Method used to obtain a random tweet from the tweets downloaded
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

    // Method used to download first 200 pages of tweets for both usernames
    public void initializeTweetsLists(String username1, String username2) throws TwitterException {
        TwitterFactory twitterFactory = new TwitterFactory();
        Twitter twitterInstance = twitterFactory.getInstance();

        Paging pagingUsername1 = new Paging(1, 200);
        tweetsFromUsername1 = twitterInstance.getUserTimeline(username1, pagingUsername1);

        Paging pagingUsername2 = new Paging(1, 200);
        tweetsFromUsername2 = twitterInstance.getUserTimeline(username2, pagingUsername2);

        removeRepliesAndTweetsWithLinks();
    }



    // The method used to remove the posts if they are a retweet, a reply to
    // another post, or contain a link
    private void removeRepliesAndTweetsWithLinks() {
        tweetsFromUsername1.removeIf(status ->
                status.getInReplyToScreenName() != null || status.getText().contains("http") || status.isRetweet());
        tweetsFromUsername2.removeIf(status ->
                status.getInReplyToScreenName() != null || status.getText().contains("http") || status.isRetweet());
    }
}
