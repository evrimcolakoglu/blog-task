package com.blog.backend.service;

import com.blog.backend.entity.Post;
import com.blog.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Tüm yazıları getir
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // ID'ye göre tek bir yazı getir
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    // Yeni yazı oluştur
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    // Yazıyı güncelle
    public Post updatePost(Long id, Post postDetails, String username) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        if (!post.getAuthor().equals(username)) {
            throw new RuntimeException("Not authorized");
        }
        post.setTitle(postDetails.getTitle());
        post.setContent(postDetails.getContent());
        // author remains the same
        return postRepository.save(post);
    }

    // Yazıyı sil
    public void deletePost(Long id, String username) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        if (!post.getAuthor().equals(username)) {
            throw new RuntimeException("Not authorized");
        }
        postRepository.deleteById(id);
    }
}
