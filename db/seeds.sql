\c employee_db;

INSERT INTO department (name) 
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Software Engineer', 120000, 2),
    ('Data Scientist', 110000, 2),
    ('Accountant', 90000, 3),
    ('Lawyer', 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),  -- Sales Lead, NULL manager_id indicates that employee is manager
    ('Jane', 'Smith', 2, 1),   -- Salesperson, reports to John Doe
    ('Alice', 'Johnson', 3, NULL), -- Software Engineer
    ('Bob', 'Brown', 4, 3),    -- Data Scientist, reports to Alice Johnson
    ('Charlie', 'Davis', 5, 1), -- Accountant
    ('Eve', 'Wilson', 6, 1); -- Lawyer