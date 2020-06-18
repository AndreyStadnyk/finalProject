package ua.com.danit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RootController {
  @GetMapping("/{path:^(?:sign-in|sign-up|reset-pass|change-pass|profile|chat|friends|tape)$}/**")
  public String redirectToAdmin(@PathVariable String path) {
    return "forward:/index.html";
  }
}
