package main.java.com.subox.image.application;


import main.java.com.subox.image.domain.entities.Image;
import main.java.com.subox.image.domain.enums.ImageType;
import main.java.com.subox.image.domain.exceptions.ImageStorageException;
import main.java.com.subox.image.domain.repositories.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.UUID;


@Service
public class ImageService {

    private final ImageRepository imageRepository;

    @Value("${storage.path}")
    private String storagePath;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image storeImage(MultipartFile file, ImageType imageType) {
        try {
            String originalName = file.getOriginalFilename();
            String storedName = UUID.randomUUID() + "_" + originalName;
            Path targetPath = Paths.get(storagePath).resolve(storedName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            Image image = Image.builder()
                    .originalName(originalName)
                    .storedName(storedName)
                    .url("/images/" + storedName)
                    .size(file.getSize())
                    .contentType(file.getContentType())
                    .uploadDate(LocalDateTime.now())
                    .imageType(imageType)
                    .build();

            return imageRepository.save(image);

        } catch (IOException e) {
            throw new ImageStorageException("Error al guardar imagen", e);
        }
    }

    public Image getImageByStoredName(String storedName) {
        return imageRepository.findByStoredName(storedName)
                .orElseThrow(() -> new ImageStorageException("Imagen no encontrada: " + storedName));
    }
}
