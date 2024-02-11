CREATE DATABASE biblioteca_typescript;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  idade VARCHAR(3) NOT NULL,
  livros_lidos INTEGER
);

CREATE TABLE livros (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  nota INTEGER NOT NULL,
  descricao TEXT,
  usuario INTEGER REFERENCES usuarios (id)
);
