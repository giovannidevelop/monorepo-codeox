

CREATE TABLE IF NOT EXISTS `region` (
  `idRegion` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRegion`));
  
  CREATE TABLE IF NOT EXISTS `comuna` (
  `idComuna` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `region_idRegion` INT(11) NOT NULL,
  PRIMARY KEY (`idComuna`),
  CONSTRAINT `fk_comuna_region`
    FOREIGN KEY (`region_idRegion`)
    REFERENCES `region` (`idRegion`));
    
CREATE TABLE IF NOT EXISTS `direccion` (
  `idDireccion` INT(11) NOT NULL AUTO_INCREMENT,
  `calle` VARCHAR(45) NULL DEFAULT NULL,
  `numero` VARCHAR(45) NULL DEFAULT NULL,
  `departamento` VARCHAR(45) NULL DEFAULT NULL,
  `piso` VARCHAR(45) NULL DEFAULT NULL,
  `oficina` VARCHAR(45) NULL DEFAULT NULL,
  `block` VARCHAR(45) NULL DEFAULT NULL,
  `descripcion` VARCHAR(45) NULL DEFAULT NULL,
  `comuna_idComuna` INT(11) NOT NULL,
  PRIMARY KEY (`idDireccion`),
  CONSTRAINT `fk_direccion_comuna`
    FOREIGN KEY (`comuna_idComuna`)
    REFERENCES `comuna` (`idComuna`));
    
    
CREATE  TABLE IF NOT EXISTS `numero` (
  `idNumero` INT(11) NOT NULL AUTO_INCREMENT,
  `numero` VARCHAR(45) NOT NULL,
  `prefijo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idNumero`));
  
  CREATE  TABLE IF NOT EXISTS `correo` (
  `idCorreo` INT(11) NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCorreo`));

  CREATE TABLE IF NOT EXISTS `persona` (
  `idPersona` INT(11) NOT NULL AUTO_INCREMENT,
  `rut` VARCHAR(45) NULL DEFAULT NULL,
  `fechaNacimiento` DATE NULL DEFAULT NULL,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `apellidoPaterno` VARCHAR(45) NULL DEFAULT NULL,
  `apellidoMaterno` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idPersona`));
  
  
  CREATE  TABLE IF NOT EXISTS  `rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idRol`));
  
  CREATE TABLE `user` (
  `idUsuario` VARCHAR(45) NOT NULL,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `persona_idPersona` INT(11) NOT NULL,
  `correo_idCorreo` INT(11) NOT NULL,
  `numero_idNumero` INT(11) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  CONSTRAINT `fk_user_persona`
    FOREIGN KEY (`persona_idPersona`)
    REFERENCES `persona` (`idPersona`),
  CONSTRAINT `fk_user_correo`
    FOREIGN KEY (`correo_idCorreo`)
    REFERENCES `correo` (`idCorreo`),
  CONSTRAINT `fk_user_numero`
    FOREIGN KEY (`numero_idNumero`)
    REFERENCES `numero` (`idNumero`));
    
    CREATE  TABLE `user_has_rol` (
  `user_idUsuario` VARCHAR(45) NOT NULL,
  `rol_idRol` INT(11) NOT NULL,
  PRIMARY KEY (`user_idUsuario`, `rol_idRol`),
  CONSTRAINT `fk_user_has_rol_user1`
    FOREIGN KEY (`user_idUsuario`)
    REFERENCES `user` (`idUsuario`),
  CONSTRAINT `fk_user_has_rol_rol1`
    FOREIGN KEY (`rol_idRol`)
    REFERENCES `rol` (`idRol`));
    
CREATE TABLE `direccion_has_persona` (
  `direccion_idDireccion` INT(11) NOT NULL,
  `persona_idPersona` INT(11) NOT NULL,
  PRIMARY KEY (`direccion_idDireccion`, `persona_idPersona`),
  CONSTRAINT `fk_direccion_has_persona_direccion1`
    FOREIGN KEY (`direccion_idDireccion`)
    REFERENCES `direccion` (`idDireccion`),
  CONSTRAINT `fk_direccion_has_persona_persona1`
    FOREIGN KEY (`persona_idPersona`)
    REFERENCES `persona` (`idPersona`));
    
    