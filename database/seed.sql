DROP DATABASE IF EXISTS company_manager;
CREATE DATABASE company_manager;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE roles (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(55) UNIQUE NOT NULL
);

CREATE TABLE users (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(55) NOT NULL,
    last_name VARCHAR(55),
    email VARCHAR(255) UNIQUE NOT NULL,
    user_password TEXT NOT NULL,
    role_id INT REFERENCES roles (id) 
);

INSERT INTO roles (name) 
VALUES 
('Editor'), 
('Admin'), 
('User');

INSERT INTO users (first_name, last_name, email, user_password, role_id) 
VALUES 
('John', 'Doe', 'john@email.com', crypt('a1b2d3', gen_salt('bf')), 1), 
('Jane', 'Doe', 'jane@email.com', crypt('asdef12345', gen_salt('bf')), 3), 
('Nuno', 'Lemos', 'nuno@email.com', crypt('12345', gen_salt('bf')), 2), 
('Ana', 'Magalhães', 'ana@email.com', crypt('abcde', gen_salt('bf')), 1),
('Rafael', 'Alves', 'rafael@email.com', crypt('pa55w0rd', gen_salt('bf')), 3);
