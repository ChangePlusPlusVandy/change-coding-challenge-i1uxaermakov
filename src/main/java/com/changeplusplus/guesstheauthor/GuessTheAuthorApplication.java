package com.changeplusplus.guesstheauthor;

import com.changeplusplus.guesstheauthor.model.StatisticsForOneGame;
import com.changeplusplus.guesstheauthor.model.TweetsForOneGame;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

// The main class of the project, where the application is started
// The two beans (tweetsForOneGame and statistics) are initialized for and
// tied to every session
@SpringBootApplication
@EntityScan(basePackages = "com.changeplusplus.guesstheauthor")
public class GuessTheAuthorApplication {

	public static void main(String[] args) {
		SpringApplication.run(GuessTheAuthorApplication.class, args);
	}

	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC-5"));
	}


	@Bean
	@Scope(
			value = WebApplicationContext.SCOPE_SESSION,
			proxyMode = ScopedProxyMode.TARGET_CLASS)
	public TweetsForOneGame tweetsForOneGame() {
		return new TweetsForOneGame();
	}

	@Bean
	@Scope(
			value = WebApplicationContext.SCOPE_SESSION,
			proxyMode = ScopedProxyMode.TARGET_CLASS)
	public StatisticsForOneGame statistics() {
		return new StatisticsForOneGame(0,0);
	}
}
