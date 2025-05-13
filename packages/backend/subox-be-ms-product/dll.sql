-- Categorías de prendas (Ej: Jeans, Poleras, Chaquetas, Vestidos)
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Subcategorías para especificar más (Ej: Manga Corta, Slim Fit, Deportivo)
CREATE TABLE subcategorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);

-- Ubicaciones físicas de almacenamiento (Ej: Bodega, Feria, Tienda, Closet)
CREATE TABLE ubicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Estados de prendas (Ej: Nueva, Usada, Dañada)
CREATE TABLE estados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Fardos de ropa (para compras de lotes)
CREATE TABLE fardos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_compra DATE NOT NULL DEFAULT CURDATE(),
    costo_total DECIMAL(10,2),
    ubicacion_id INT,
    estado ENUM('Pendiente', 'Abierto', 'Cerrado') DEFAULT 'Pendiente',
    FOREIGN KEY (ubicacion_id) REFERENCES ubicaciones(id)
);

-- Prendas individuales
CREATE TABLE prendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria_id INT NOT NULL,
    subcategoria_id INT NULL,
    fardo_id INT NULL,  -- Puede estar dentro de un fardo o no
    ubicacion_id INT NOT NULL,
    estado_id INT NOT NULL, -- Estado de la prenda
    precio DECIMAL(10,2),
    fecha_ingreso DATE NOT NULL DEFAULT CURDATE(),
    estado_venta ENUM('Disponible', 'Reservado', 'Vendido') DEFAULT 'Disponible',
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (subcategoria_id) REFERENCES subcategorias(id) ON DELETE SET NULL,
    FOREIGN KEY (fardo_id) REFERENCES fardos(id) ON DELETE SET NULL,
    FOREIGN KEY (ubicacion_id) REFERENCES ubicaciones(id),
    FOREIGN KEY (estado_id) REFERENCES estados(id)
);

-- Registro de movimientos de stock (Ej: Entrada, Salida, Cambio de ubicación)
CREATE TABLE movimientos_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prenda_id INT NOT NULL,
    tipo ENUM('Entrada', 'Salida', 'Cambio de Ubicación') NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ubicacion_origen INT NULL,
    ubicacion_destino INT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    FOREIGN KEY (prenda_id) REFERENCES prendas(id) ON DELETE CASCADE,
    FOREIGN KEY (ubicacion_origen) REFERENCES ubicaciones(id) ON DELETE SET NULL,
    FOREIGN KEY (ubicacion_destino) REFERENCES ubicaciones(id) ON DELETE SET NULL
);

-- Clientes (Para registrar ventas)
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NULL,
    email VARCHAR(100) NULL UNIQUE
);

-- Registro de ventas
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('Efectivo', 'Transferencia', 'Tarjeta') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Detalle de las prendas vendidas
CREATE TABLE detalle_ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    prenda_id INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
    FOREIGN KEY (prenda_id) REFERENCES prendas(id) ON DELETE CASCADE
);
