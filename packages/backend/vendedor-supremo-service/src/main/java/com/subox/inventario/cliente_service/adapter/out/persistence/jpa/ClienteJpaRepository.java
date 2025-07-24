package com.subox.inventario.cliente_service.adapter.out.persistence.jpa;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ClienteEntity;



@Repository
public interface ClienteJpaRepository extends JpaRepository<ClienteEntity, Long> {
}