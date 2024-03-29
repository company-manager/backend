DROP TABLE IF EXISTS documents, projects, users, companies, clients CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE companies (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT current_timestamp,
    company_name VARCHAR(55) NOT NULL,
    taxpayer_id VARCHAR(9) NOT NULL
);

CREATE TABLE clients (
    client_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT current_timestamp,
    company_id uuid,
    name VARCHAR(55) NOT NULL,
    taxpayer_id VARCHAR(9),
    address_1 VARCHAR(55),
    address_2 VARCHAR(55),
    city VARCHAR(55),
    country VARCHAR(55),
    phone_1 VARCHAR(55),
    phone_2 VARCHAR(55),
    CONSTRAINT fk_company FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT current_timestamp,
    first_name VARCHAR(55) NOT NULL,
    last_name VARCHAR(55),
    email VARCHAR(255) UNIQUE NOT NULL,
    user_password TEXT NOT NULL,
    role_id INT,
    is_verified BOOLEAN DEFAULT FALSE,
    terms_accepted BOOLEAN,
    verification_token VARCHAR(255),
    company_id uuid,
    CONSTRAINT fk_company FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE projects (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT current_timestamp,
    project_name VARCHAR(55) NOT NULL,
    status_id INT,
    company_id uuid NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    CONSTRAINT fk_company FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE,
    CONSTRAINT fk_client FOREIGN KEY(client_id) REFERENCES clients(client_id) ON DELETE CASCADE,
    CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE documents (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT current_timestamp,
    edited_at TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    author_id uuid DEFAULT NULL,
    company_id uuid NOT NULL,
    CONSTRAINT fk_company FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE,
    CONSTRAINT fk_users FOREIGN KEY(author_id) REFERENCES users(id)
);

INSERT INTO companies (company_name, taxpayer_id) 
VALUES 
('Company 01', '500123098'), 
('Company 02', '552309128'), 
('Company 03', '522373689'); 

INSERT INTO clients (name, taxpayer_id, company_id) 
VALUES 
('Client 01', '234567890', (SELECT id FROM companies WHERE taxpayer_id='500123098')), 
('Client 01', '234567890', (SELECT id FROM companies WHERE taxpayer_id='522373689')), 
('Client 02', '103678932', (SELECT id FROM companies WHERE taxpayer_id='552309128')), 
('Client 03', '139087645', (SELECT id FROM companies WHERE taxpayer_id='552309128')); 

INSERT INTO users (first_name, last_name, email, user_password, role_id, is_verified, company_id) 
VALUES 
('John', 'Doe', 'john@email.com', crypt('12345', gen_salt('bf')), 1, TRUE, (SELECT id FROM companies WHERE taxpayer_id='552309128')), 
('Patricia', 'Perez', 'patricia@email.com', crypt('12345', gen_salt('bf')), 2, TRUE, (SELECT id FROM companies WHERE taxpayer_id='500123098')), 
('Jane', 'Doe', 'jane@email.com', crypt('asdf', gen_salt('bf')), 3, FALSE, (SELECT id FROM companies WHERE taxpayer_id='522373689'));

INSERT INTO projects (project_name, status_id, company_id, client_id, user_id) 
VALUES
('Project 01', 1, (SELECT id FROM companies WHERE taxpayer_id='522373689'), (SELECT client_id FROM clients WHERE taxpayer_id='234567890' LIMIT 1), (SELECT id FROM users WHERE email='jane@email.com')),
('Project 02', 2, (SELECT id FROM companies WHERE taxpayer_id='552309128'), (SELECT client_id FROM clients WHERE taxpayer_id='103678932' LIMIT 1), (SELECT id FROM users WHERE email='john@email.com')),
('Project 03', 1, (SELECT id FROM companies WHERE taxpayer_id='552309128'), (SELECT client_id FROM clients WHERE taxpayer_id='103678932' LIMIT 1), (SELECT id FROM users WHERE email='john@email.com')),
('Project 04', 2, (SELECT id FROM companies WHERE taxpayer_id='500123098'), (SELECT client_id FROM clients WHERE taxpayer_id='234567890' LIMIT 1), (SELECT id FROM users WHERE email='patricia@email.com')),
('Project 05', 3, (SELECT id FROM companies WHERE taxpayer_id='552309128'), (SELECT client_id FROM clients WHERE taxpayer_id='139087645' LIMIT 1), (SELECT id FROM users WHERE email='john@email.com')),
('Project 06', 4, (SELECT id FROM companies WHERE taxpayer_id='500123098'), (SELECT client_id FROM clients WHERE taxpayer_id='234567890' LIMIT 1), (SELECT id FROM users WHERE email='patricia@email.com'));

INSERT INTO documents (title, body, author_id, company_id)
VALUES
('Documento 01', '<div><h1>Título Doc #01</h1></div>', NULL, (SELECT id FROM companies WHERE taxpayer_id='552309128')),
('Documento 02', '<div><h2>Título Doc #02</h2></div>', NULL, (SELECT id FROM companies WHERE taxpayer_id='500123098')),
('Documento 04', '<div><h2>Título Doc #04</h2></div>', NULL, (SELECT id FROM companies WHERE taxpayer_id='500123098')),
('Documento 05', '<div><h2>Título Doc #05</h2></div>', NULL, (SELECT id FROM companies WHERE taxpayer_id='552309128')),
('Documento 03', '<div><h3>Título Doc #03</h3></div>', NULL, (SELECT id FROM companies WHERE taxpayer_id='522373689'));