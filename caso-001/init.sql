CREATE DATABASE IF NOT EXISTS product_master;
USE product_master;

CREATE TABLE IF NOT EXISTS product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL
);
-- codificación para que no haya problemas con caracteres especiales
SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;
SET COLLATION_CONNECTION = 'utf8mb4_unicode_ci';

INSERT INTO product (name, description) VALUES
  ('Laptop Lenovo ThinkPad', 'Portátil empresarial con procesador Intel Core i7 y 16 GB de RAM.'),
  ('Mouse inalámbrico Logitech', 'Mouse ergonómico con conexión Bluetooth y batería recargable.'),
  ('Monitor Samsung 24"', 'Monitor LED Full HD de 24 pulgadas con entrada HDMI y VGA.'),
  ('Teclado mecánico Redragon', 'Teclado con retroiluminación RGB y switches blue para una mejor experiencia de escritura.'),
  ('Auriculares Sony WH-1000XM4', 'Auriculares con cancelación de ruido activa y hasta 30 horas de batería.');
