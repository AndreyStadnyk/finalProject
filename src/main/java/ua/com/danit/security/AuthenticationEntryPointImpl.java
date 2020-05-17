package ua.com.danit.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {

  private ObjectMapper objectMapper;

  @Autowired
  public AuthenticationEntryPointImpl(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
                       AuthenticationException authException) throws IOException {
    AuthResult authResult = AuthResult.builder()
        .timestamp(new Date(System.currentTimeMillis()))
        .status(HttpStatus.UNAUTHORIZED.value())
        .message(HttpStatus.UNAUTHORIZED.getReasonPhrase())
        .build();
    response.getWriter().write(objectMapper.writeValueAsString(authResult));
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
  }

}
