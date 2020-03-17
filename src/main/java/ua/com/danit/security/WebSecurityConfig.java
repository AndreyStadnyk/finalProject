package ua.com.danit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.provisioning.JdbcUserDetailsManagerConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


  private AuthenticationEntryPoint authEntryPoint;
  private BCryptPasswordEncoder passwordEncoder;
  private DataSource dataSource;

  @Autowired
  public WebSecurityConfig(AuthenticationEntryPoint authEntryPoint,
                           BCryptPasswordEncoder passwordEncoder,
                           DataSource dataSource) {
    this.authEntryPoint = authEntryPoint;
    this.passwordEncoder = passwordEncoder;
    this.dataSource = dataSource;
  }

  public WebSecurityConfig(boolean disableDefaults,
                           AuthenticationEntryPoint authEntryPoint,
                           BCryptPasswordEncoder passwordEncoder,
                           DataSource dataSource) {
    super(disableDefaults);
    this.authEntryPoint = authEntryPoint;
    this.passwordEncoder = passwordEncoder;
    this.dataSource = dataSource;
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

    this.passwordEncoder.encode(password);

    JdbcUserDetailsManagerConfigurer<AuthenticationManagerBuilder>
        authManager = auth.jdbcAuthentication();
    authManager.dataSource(dataSource)
        .usersByUsernameQuery(
        "select username, password, from Users "
          +
        "where username=?")
        .authoritiesByUsernameQuery(
        "select username, from UserAuthorities "
          +
        "where username=?")
        .passwordEncoder(this.passwordEncoder);


  }

}
