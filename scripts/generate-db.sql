CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Crear un tipo de datos ENUM para el rol
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
-- Crear la tabla users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'USER',
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    verification_code VARCHAR(255),
    recuperation_code VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para búsqueda rápida en el campo email (opcional)
CREATE INDEX idx_users_email ON users (email);