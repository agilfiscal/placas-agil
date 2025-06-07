USE agilfi38_placas;

-- Primeiro, vamos descobrir o nome real da chave estrangeira
SET @constraint_name = (
    SELECT CONSTRAINT_NAME 
    FROM information_schema.TABLE_CONSTRAINTS 
    WHERE TABLE_SCHEMA = 'agilfi38_placas' 
    AND TABLE_NAME = 'placas' 
    AND CONSTRAINT_TYPE = 'FOREIGN KEY'
    LIMIT 1
);

-- Remover a chave estrangeira existente se ela existir
SET @sql = IF(@constraint_name IS NOT NULL, 
    CONCAT('ALTER TABLE placas DROP FOREIGN KEY ', @constraint_name),
    'SELECT "Nenhuma chave estrangeira encontrada"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Adicionar novas colunas à tabela placas
ALTER TABLE placas
ADD COLUMN IF NOT EXISTS preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS descricao TEXT;

-- Adicionar a nova chave estrangeira
ALTER TABLE placas
ADD CONSTRAINT fk_placas_usuario 
FOREIGN KEY (usuario_id) 
REFERENCES usuarios(id) 
ON DELETE CASCADE;

-- Remover o UNIQUE do campo numero se existir
ALTER TABLE placas
DROP INDEX IF EXISTS numero; 