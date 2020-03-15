package ua.com.danit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.provisioning.InMemoryUserDetailsManagerConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


  private AuthenticationEntryPoint authEntryPoint;
  private BCryptPasswordEncoder cryptPasswordEncoder;

  @Autowired
  public WebSecurityConfig(AuthenticationEntryPoint authEntryPoint,
                           BCryptPasswordEncoder cryptPasswordEncoder) {
    this.authEntryPoint = authEntryPoint;
    this.cryptPasswordEncoder = cryptPasswordEncoder;
  }

  public WebSecurityConfig(boolean disableDefaults, AuthenticationEntryPoint authEntryPoint,
                           BCryptPasswordEncoder cryptPasswordEncoder) {
    super(disableDefaults);
    this.authEntryPoint = authEntryPoint;
    this.cryptPasswordEncoder = cryptPasswordEncoder;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();

    http.authorizeRequests().anyRequest().authenticated();

    http.httpBasic().authenticationEntryPoint(authEntryPoint);
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

    String password = "123";

    String encrytedPassword = this.cryptPasswordEncoder.encode(password);
    System.out.println("Encoded password of 123=" + encrytedPassword);


    InMemoryUserDetailsManagerConfigurer<AuthenticationManagerBuilder>
        mngConfig = auth.inMemoryAuthentication();

    UserDetails u1 = User.withUsername("Vasya").password(encrytedPassword).roles("USER").build();
    UserDetails u2 = User.withUsername("Katya").password(encrytedPassword).roles("USER").build();

    mngConfig.withUser(u1);
    mngConfig.withUser(u2);

  }

}
