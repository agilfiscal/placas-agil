CREATE DATABASE IF NOT EXISTS agilfi38_placas;
USE agilfi38_placas;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de placas
CREATE TABLE IF NOT EXISTS placas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(8) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    descricao TEXT,
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Remover índices existentes (se existirem)
DROP INDEX IF EXISTS idx_placas_numero ON placas;
DROP INDEX IF EXISTS idx_usuarios_email ON usuarios;

-- Criar índices
CREATE INDEX idx_placas_numero ON placas(numero);
CREATE INDEX idx_usuarios_email ON usuarios(email); 