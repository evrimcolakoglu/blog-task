package com.blog.backend.controller;

import com.blog.backend.entity.Post;
import com.blog.backend.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = { "http://localhost:3000", "http://138.197.187.123:3000" }) // Dünyadaki tüm adreslerden gelen isteklere izin verir
public class PostController {

    @Autowired
    private PostService postService;

    // Tüm yazıları getir (GET)
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // Tek bir yazıyı getir (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Yeni yazı oluştur (POST)
    @PostMapping
    public Post createPost(@Valid @RequestBody Post post) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        post.setAuthor(username);
        return postService.createPost(post);
    }

    // Yazıyı güncelle (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @Valid @RequestBody Post postDetails) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            return ResponseEntity.ok(postService.updatePost(id, postDetails, username));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    // Yazıyı sil (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            postService.deletePost(id, username);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
