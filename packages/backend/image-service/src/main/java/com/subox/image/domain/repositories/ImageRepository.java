package main.java.com.subox.image.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import main.java.com.subox.image.domain.entities.Image;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findByStoredName(String storedName);
}
