USE agilfi38_placas;

-- Verificar se as colunas existem
SELECT 
    COLUMN_NAME, 
    DATA_TYPE, 
    IS_NULLABLE, 
    COLUMN_DEFAULT
FROM 
    INFORMATION_SCHEMA.COLUMNS 
WHERE 
    TABLE_SCHEMA = 'agilfi38_placas' 
    AND TABLE_NAME = 'placas'
    AND COLUMN_NAME IN ('preco', 'descricao');

-- Verificar a chave estrangeira
SELECT 
    CONSTRAINT_NAME,
    DELETE_RULE
FROM 
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE 
    TABLE_SCHEMA = 'agilfi38_placas'
    AND TABLE_NAME = 'placas'
    AND REFERENCED_TABLE_NAME = 'usuarios'; 