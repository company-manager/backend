DROP TABLE IF EXISTS projects, roles, users, companies, clients, company_client, status CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE companies (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT current_timestamp,
    company_name VARCHAR(55) NOT NULL,
    taxpayer_id VARCHAR(9) NOT NULL
);

CREATE TABLE clients (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT current_timestamp,
    client_name VARCHAR(55) NOT NULL,
    taxpayer_id VARCHAR(9) NOT NULL
);

CREATE TABLE company_client (
    company_id uuid,
    client_id uuid,
    PRIMARY KEY (company_id, client_id),
    CONSTRAINT fk_company FOREIGN KEY(company_id) REFERENCES companies(id),
    CONSTRAINT fk_client FOREIGN KEY(client_id) REFERENCES clients(id)
);

CREATE TABLE users (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT current_timestamp,
    first_name VARCHAR(55) NOT NULL,
    last_name VARCHAR(55),
    email VARCHAR(255) UNIQUE NOT NULL,
    user_password TEXT NOT NULL,
    role_id INT,
    company_id uuid
);

CREATE TABLE projects (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT current_timestamp,
    project_name VARCHAR(55) UNIQUE NOT NULL,
    client_id uuid,
    status_id INT,
    responsible_id uuid,
    CONSTRAINT fk_client FOREIGN KEY(client_id) REFERENCES clients(id),
    CONSTRAINT fk_users FOREIGN KEY(responsible_id) REFERENCES users(id)
);

INSERT INTO companies (company_name, taxpayer_id) 
VALUES 
('Company 01', '500123098'), 
('Company 02', '552309128'), 
('Company 03', '522373689'); 

INSERT INTO clients (client_name, taxpayer_id) 
VALUES 
('Client 01', '234567890'), 
('Client 02', '103678932'), 
('Client 03', '139087645'); 

INSERT INTO users (first_name, last_name, email, user_password, role_id, company_id) 
VALUES 
('John', 'Doe', 'john@email.com', crypt('a1b2d3', gen_salt('bf')), 1, (SELECT id FROM companies WHERE taxpayer_id='500123098')), 
('Jane', 'Doe', 'jane@email.com', crypt('asdef12345', gen_salt('bf')), 3, (SELECT id FROM companies WHERE taxpayer_id='522373689'));

INSERT INTO company_client (company_id, client_id) 
VALUES
((SELECT id FROM companies WHERE taxpayer_id='500123098'), (SELECT id FROM clients WHERE taxpayer_id='103678932')),
((SELECT id FROM companies WHERE taxpayer_id='552309128'), (SELECT id FROM clients WHERE taxpayer_id='103678932')),
((SELECT id FROM companies WHERE taxpayer_id='522373689'), (SELECT id FROM clients WHERE taxpayer_id='234567890')),
((SELECT id FROM companies WHERE taxpayer_id='552309128'), (SELECT id FROM clients WHERE taxpayer_id='139087645'));

INSERT INTO projects (project_name, status_id, client_id, responsible_id) 
VALUES
('Project 01', 1, (SELECT id FROM clients WHERE taxpayer_id='103678932'), (SELECT id FROM users WHERE first_name='John')), 
('Project 02', 3, (SELECT id FROM clients WHERE taxpayer_id='234567890'), (SELECT id FROM users WHERE first_name='Jane'));