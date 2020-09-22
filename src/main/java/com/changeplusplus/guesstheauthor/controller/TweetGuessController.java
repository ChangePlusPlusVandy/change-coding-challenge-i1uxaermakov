package com.changeplusplus.guesstheauthor.controller;


import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api/polls")
public class TweetGuessController {

    @GetMapping("/")
    public String getInitialPage() {
        return "";
    }

    @PostMapping("/")
    public String selectTwoAccountsAndPlay(@RequestParam String username1, @RequestParam String username2) {
        return "";
    }

    @PostMapping("/guess")
    public String guessAndShowCorrectAnswer(@RequestParam String name) {
        return "";
    }

}
