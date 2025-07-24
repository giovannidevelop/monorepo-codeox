package main.java.com.subox.image.domain.entities;


import lombok.*;
import main.java.com.subox.image.domain.enums.ImageType;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalName;
    private String storedName;
    private String url;
    private Long size;
    private String contentType;
    private LocalDateTime uploadDate;

    @Enumerated(EnumType.STRING)
    private ImageType imageType;
}
