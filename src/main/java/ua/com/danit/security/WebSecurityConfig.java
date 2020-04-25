package ua.com.danit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import ua.com.danit.service.UserService;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private UserService userService;
  private SecurityFailureHandler failureHandler;
  private SecuritySuccessHandler successHandler;
  private AuthenticationEntryPoint authenticationEntryPoint;

  @Autowired
  WebSecurityConfig(UserService userService,
                    SecuritySuccessHandler successHandler,
                    SecurityFailureHandler failureHandler,
                    AuthenticationEntryPoint authenticationEntryPoint) {
    this.userService = userService;
    this.failureHandler = failureHandler;
    this.successHandler = successHandler;
    this.authenticationEntryPoint = authenticationEntryPoint;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().and().authorizeRequests()
      .anyRequest()
      .authenticated()
      .and()
      .exceptionHandling()
      .authenticationEntryPoint(authenticationEntryPoint)
      .and()
      .formLogin()
      .loginProcessingUrl("/auth")
      .successHandler(successHandler)
      .failureHandler(failureHandler)
      .permitAll();
  }

  @Override
  protected UserDetailsService userDetailsService() {
    return userService;
  }
}

