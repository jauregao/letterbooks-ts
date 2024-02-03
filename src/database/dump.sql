CREATE DATABASE typescript;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  idade VARCHAR(3) NOT NULL,
  livros_lidos NUMBER
);

CREATE TABLE livros (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  nota NUMBER NOT NULL,
  descricao TEXT,
  usuario NUMBER REFERENCES usuarios (id)
);
