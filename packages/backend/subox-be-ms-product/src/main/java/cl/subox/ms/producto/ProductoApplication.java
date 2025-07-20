package cl.subox.ms.producto;

import cl.subox.ms.producto.domain.entities.entity.Calidad;
import cl.subox.ms.producto.domain.entities.entity.Categoria;
import cl.subox.ms.producto.domain.entities.entity.EstadoProducto;
import cl.subox.ms.producto.domain.entities.entity.Marca;
import cl.subox.ms.producto.infraestructure.repository.CalidadRepository;
import cl.subox.ms.producto.infraestructure.repository.CategoriaRepository;
import cl.subox.ms.producto.infraestructure.repository.EstadoProductoRepository;
import cl.subox.ms.producto.infraestructure.repository.MarcaRepository;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProductoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductoApplication.class, args);
    }

    @Bean
    CommandLineRunner initCategorias(CategoriaRepository categoriaRepository) {
        return args -> {
            List<Categoria> categorias = List.of(
                    new Categoria(null, "Poleras",
                            "Poleras de algodón y poliéster, ropa americana de diversas marcas."),
                    new Categoria(null, "Polerones", "Polerones gruesos o delgados, con o sin gorro, ropa americana."),
                    new Categoria(null, "Polerones con cuello", "Polerones con cuello polo o cierre, ropa americana."),
                    new Categoria(null, "Chaquetas",
                            "Chaquetas de mezclilla, cuero, cortavientos y otros tipos, ropa americana."),
                    new Categoria(null, "Jeans",
                            "Pantalones de mezclilla en diversas tallas y cortes, ropa americana."),
                    new Categoria(null, "Pantalones de vestir", "Pantalones formales y semi-formales, ropa americana."),
                    new Categoria(null, "Shorts", "Shorts deportivos y casuales para hombre y mujer."),
                    new Categoria(null, "Faldas", "Faldas cortas y largas, varios estilos y materiales."),
                    new Categoria(null, "Vestidos", "Vestidos casuales, formales y de verano, ropa americana."),
                    new Categoria(null, "Camisas", "Camisas formales e informales, a cuadros, jeans y más."),
                    new Categoria(null, "Blusas", "Blusas femeninas de vestir, ropa americana."),
                    new Categoria(null, "Sweaters", "Sweaters de hilo, lana o algodón, ropa americana."),
                    new Categoria(null, "Ropa deportiva", "Conjuntos deportivos, calzas, buzos, ropa americana."),
                    new Categoria(null, "Ropa interior", "Sostenes, calzones, bóxers, ropa americana."),
                    new Categoria(null, "Pijamas", "Conjuntos para dormir de hombre, mujer y niño."),
                    new Categoria(null, "Ropa de bebé", "Ropa americana para recién nacidos y bebés pequeños."),
                    new Categoria(null, "Zapatos", "Zapatillas, botas, sandalias y más, ropa americana."),
                    new Categoria(null, "Accesorios",
                            "Cinturones, gorros, pañuelos, bufandas, mochilas, ropa americana."));

            for (Categoria categoria : categorias) {
                if (!categoriaRepository.existsByNombreIgnoreCase(categoria.getNombre())) {
                    categoriaRepository.save(categoria);
                }
            }
        };
    }

    @Bean
    CommandLineRunner initCalidades(CalidadRepository calidadRepository) {
        return args -> {
            List<Calidad> calidades = List.of(
                    new Calidad(null, "Primera", "Prendas de alta calidad, sin detalles visibles"),
                    new Calidad(null, "Segunda", "Prendas con detalles menores o signos leves de uso"),
                    new Calidad(null, "Tercera", "Prendas con desgaste notable o manchas"),
                    new Calidad(null, "Selección", "Prendas seleccionadas por marca o estilo"),
                    new Calidad(null, "Retorno", "Prendas devueltas o apartadas"),
                    new Calidad(null, "Outlet", "Stock con defectos o fuera de temporada"));

            for (Calidad calidad : calidades) {
                boolean existe = calidadRepository
                        .findAll()
                        .stream()
                        .anyMatch(c -> c.getNombre().equalsIgnoreCase(calidad.getNombre()));

                if (!existe) {
                    calidadRepository.save(calidad);
                }
            }
        };
    }

    @Bean
    CommandLineRunner initMarcas(MarcaRepository marcaRepository) {
        return args -> {
            List<Marca> marcas = List.of(
                    new Marca(null, "Nike"),
                    new Marca(null, "Adidas"),
                    new Marca(null, "Levi's"),
                    new Marca(null, "Tommy Hilfiger"),
                    new Marca(null, "GAP"),
                    new Marca(null, "Old Navy"),
                    new Marca(null, "Aeropostale"),
                    new Marca(null, "American Eagle"),
                    new Marca(null, "Hollister"),
                    new Marca(null, "Abercrombie & Fitch"),
                    new Marca(null, "Under Armour"),
                    new Marca(null, "Champion"),
                    new Marca(null, "Polo Ralph Lauren"),
                    new Marca(null, "Calvin Klein"),
                    new Marca(null, "Banana Republic"),
                    new Marca(null, "Forever 21"),
                    new Marca(null, "H&M"),
                    new Marca(null, "Zara"),
                    new Marca(null, "Reebok"),
                    new Marca(null, "The North Face"),
                    new Marca(null, "Columbia"),
                    new Marca(null, "Dickies"),
                    new Marca(null, "Converse"),
                    new Marca(null, "Vans"),
                    new Marca(null, "Wrangler"));

            for (Marca marca : marcas) {
                if (!marcaRepository.existsByNombreIgnoreCase(marca.getNombre())) {
                    marcaRepository.save(marca);
                }
            }
        };
    }

    @Bean
    CommandLineRunner initEstadoProducto(EstadoProductoRepository estadoProductoRepository) {
        return args -> {
            List<EstadoProducto> estados = List.of(
                    new EstadoProducto(null, "Nuevo"),
                    new EstadoProducto(null, "Usado"),
                    new EstadoProducto(null, "Dañado"),
                    new EstadoProducto(null, "Como nuevo")
                    );

            for (EstadoProducto estado : estados) {
                if (!estadoProductoRepository.existsByEstadoIgnoreCase(estado.getEstado())) {
                    estadoProductoRepository.save(estado);
                    System.out.println("Estado agregado: " + estado.getEstado());
                }
            }
        };
    }
}
