package com.subox.inventario.producto_service.adapter.out.persistence.jpa;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.subox.inventario.producto_service.adapter.out.persistence.entity.ProductoEntity;



@Repository
public interface ProductoJpaRepository extends JpaRepository<ProductoEntity, Long> {
}