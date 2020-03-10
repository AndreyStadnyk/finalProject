package ua.com.danit;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.com.danit.repository.CommentRepository;

import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CommentRepositoryTest {
  @Autowired
  private CommentRepository commentRepository;

  @Test
  public void test() {
    assertTrue(true);
  }
}
