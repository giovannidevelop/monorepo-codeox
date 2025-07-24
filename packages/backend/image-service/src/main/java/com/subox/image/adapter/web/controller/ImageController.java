package com.subox.image.adapter.web.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;

    @Value("${storage.path}")
    private String storagePath;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    // Subida
    @PostMapping
    public ResponseEntity<Image> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "PRODUCT") ImageType imageType) {
        Image image = imageService.storeImage(file, imageType);
        return ResponseEntity.ok(image);
    }

    // Descarga
    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            Path path = Paths.get(storagePath).resolve(fileName).normalize();
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // o detectar tipo real
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
