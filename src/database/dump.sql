CREATE DATABASE library_typescript;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  pass TEXT NOT NULL,
  full_name VARCHAR(255) NOT NULL
);

CREATE TABLE books (
  isbn SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL,
  review VARCHAR(510)
);

CREATE TABLE read_books (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  book_isbn INTEGER REFERENCES books(isbn)
);
