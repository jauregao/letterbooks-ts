CREATE DATABASE biblioteca_typescript;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  nome VARCHAR(255) NOT NULL
);

CREATE TABLE livros (
  isbn SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  nota INTEGER NOT NULL,
  descricao TEXT
);

CREATE TABLE livros_lidos (
  id SERIAL PRIMARY KEY,
  usuario REFERENCES usuarios(id)
  isbn REFERENCES livros(isbn)
);
