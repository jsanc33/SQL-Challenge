drop database if exists employee_db;

create database employee_db;

-- \c employee_db;

drop table if exists department;

create table department (
    id serial primary key,
    name varchar(30) not null
);

drop table if exists role;

create table role (
    id serial primary key,
    title varchar(30) not null,
    salary decimal,
    department_id int not null,
    foreign key (department_id) references department(id)
);

drop table if exists employee;

create table employee (
    id serial primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int,
    foreign key (role_id) references role(id),
    foreign key (manager_id) references employee(id)
);