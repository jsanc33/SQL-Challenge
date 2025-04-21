import { pool, connectToDb } from './connection.js';
// import "console.table";
import inquirer from 'inquirer';
const { prompt } = inquirer;
// await connectToDb();


class DB {
    constructor(pool, connectToDb) {
        this.pool = pool;
        this.connectToDb = connectToDb;
    }

    getDepts = async () => {
        try {
            await this.connectToDb();
            const sql = `
                SELECT * FROM department;
            `;
            const { rows } = await this.pool.query(sql);
            // console.table(rows);
            return rows;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    };

    getRoles = async () => {
        try {
            await this.connectToDb();
            const sql = `
                SELECT 

                    title, 
                    d.name AS department, 
                    salary

                FROM role AS r
                JOIN department AS d ON r.department_id = d.id;
            `;
            const { rows } = await this.pool.query(sql);
            // console.table(rows)
            return rows;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    };

    getEmps = async () => {
        try {
            await this.connectToDb();
            const sql = `
                SELECT
                    e1.first_name,
                    e1.last_name,
                    r.title,
                    d.name AS department,
                    r.salary,   
                    CONCAT(e2.first_name, ' ', e2.last_name) AS manager
                FROM employee AS e1
                LEFT JOIN role AS r ON e1.role_id = r.id
                LEFT JOIN department AS d ON r.department_id = d.id
                LEFT JOIN employee AS e2 ON e1.manager_id = e2.id
                ORDER BY e1.last_name, e1.first_name;
            `;
            const { rows } = await this.pool.query(sql);
            // console.table(rows)
            return rows;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    };

    addDepts = async () => {

        try {
            await this.connectToDb();
            const { departmentName } = await prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the new department:',
                    validate: input => input ? true : 'Department name cannot be empty!'
                }
            ]);
            const sql = `
                INSERT INTO department (name)
                VALUES ($1)
                RETURNING *;
            `;
            const values = [departmentName];
            const { rows } = await this.pool.query(sql, values);
            // console.log(`Department "${rows[0].name}" added successfully!`);
            // console.table(rows);
            return rows;
        }
        catch (error) {
            const { rows } = await this.pool.query(sql);
            console.table(rows);
            console.error('Error adding department:', error);

        }
    };

    addEmps = async () => {

        // try {
        await this.connectToDb();

        let sql = `SELECT 
                        id value,
                        title name
                    FROM role;`;

        let ans = await this.pool.query(sql);

        sql = `SELECT
            concat(first_name, ' ', last_name) AS name,
            id AS value
        FROM employee WHERE manager_id is NULL;`;

        let managers = await this.pool.query(sql);

        managers.rows.push({
            name: "None", // Option for no manager
            value: null // Set value to null if no manager
        });

        const { first_name, last_name, role_id, manager_id } = await prompt([
            {
                type: 'list',
                name: 'role_id',
                message: "Select the employee's role:",
                choices: ans.rows
            },
            {
                type: 'input',
                name: 'first_name',
                message: "Enter employee's first name:",
                validate: input => input ? true : "Employee's name cannot be empty!"
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Enter employee's last name:",
                validate: input => input ? true : "Employee's name cannot be empty!"
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Select the employee's manager:",
                choices: managers.rows
            }
        ])

        sql = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [first_name, last_name, role_id, manager_id];
        const { rows } = await this.pool.query(sql, values);
        return rows;
    }

    // FINISH addEmps function, add addRole, add updateEmployee (only need to update role_id)

    addRole = async () => {
        try {
            await this.connectToDb();

            const departments = await this.getDepts(); // Get all departments for the role

            const { title, salary, department_id } = await prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "Enter the role's title:",
                    validate: input => input ? true : "Role title cannot be empty!"
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "Enter the role's salary:",
                    validate: input => !isNaN(input) && input > 0 ? true : "Salary must be a positive number!"
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: "Select the department for this role:",
                    choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
                }
            ]);

            const sql = `
                INSERT INTO role (title, salary, department_id)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const values = [title, salary, department_id];
            const { rows } = await this.pool.query(sql, values);
            return rows;
        } catch (error) {
            console.error('Error adding role:', error);
            throw error;
        }
    };

    updateEmployeeRole = async () => {
        try {
            await this.connectToDb();

            let sql = `
                SELECT
                    id,
                    first_name,
                    last_name
                FROM employee;
                `;

            const { rows: employees } = await this.pool.query(sql);

            sql = `
                SELECT
                    id,
                    title
                FROM role;
                `;

            const { rows: roles } = await this.pool.query(sql);

            const { employee_id, role_id } = await prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: "Select the employee to update:",
                    choices: employees.map(emp => ({
                        name: `${emp.first_name} ${emp.last_name}`,
                        value: emp.id
                    }))
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: "Select the new role for this employee:",
                    choices: roles.map(role => ({ name: role.title, value: role.id }))
                }
            ]);

            sql = `
                UPDATE employee
                SET role_id = $1
                WHERE id = $2
                RETURNING *;
            `;
            const values = [role_id, employee_id];
            const { rows } = await this.pool.query(sql, values);
            return rows;
        } catch (error) {
            console.error('Error updating employee role:', error);
            throw error;
        }
    };

};

export default new DB(pool, connectToDb);


// const db = new DB(pool, connectToDb);

// db.getDepts();
// db.getRoles();
// db.getEmps();
// db.addDepts();
// db.addEmps();








// SELECT
// 	e1.first_name,
// 	r.title,
// 	d.name department,
// 	CONCAT(e2.first_name, ' ', e2.last_name) manager

// FROM employee AS e1
// JOIN role AS r ON e1.role_id = r.id
// JOIN department d ON r.department_id = d.id
// LEFT JOIN employee e2 ON e1.manager_id = e2.id;






