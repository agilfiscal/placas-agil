USE agilfi38_placas;

-- Adicionar novas colunas à tabela placas
ALTER TABLE placas
ADD COLUMN IF NOT EXISTS preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS descricao TEXT;

-- Remover o UNIQUE do campo numero se existir
ALTER TABLE placas
DROP INDEX IF EXISTS numero; 