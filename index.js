import inquirer from "inquirer";
const { prompt } = inquirer;
import db from "./db/DB.js";
import "console.table";

const init = async () => {
  // Prompt the user for input
  prompt([
    {
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
  ]).then(async ans => {
    let { task } = ans;
    let rows;

    switch (task) {
      case 'view all departments':
        rows = await db.getDepts();
        console.table(rows);
        init();
        break;
      case 'view all roles':
        rows = await db.getRoles();
        console.table(rows);
        init();
        break;
      case 'view all employees':
        rows = await db.getEmps();
        console.table(rows);
        init();
        break;
      case 'add a department':
        rows = await db.addDepts();
        console.log(`Department "${rows[0].name}" added successfully!`);
        console.table(rows);
        init(); // self calling function to prompt user to make a selection again
        break; // NOTE: if you don't add this, the next case will run too
      case 'add an employee':
        rows = await db.addEmps();
        console.log(`Employee "${rows[0].name}" added successfully!`);
        console.table(rows);
        init();
        break;
      case 'add a role':
        rows = await db.addRole();
        console.log(`Role "${rows[0].title}" added successfully!`);
        console.table(rows);
        init();
        break;
      case 'update an employee role':
        rows = await db.updateEmployeeRole();
        if (rows) {
          console.log(`${rows[0].first_name} ${rows[0].last_name}'s role updated successfully!`);
          console.table(rows);
        } else {
          console.log("No changes made.");
        }
        init();
        break;
      default:
        console.log("Invalid option selected");
    }

    // if (task === 'view all departments') {
    //   db.viewDepts();
    // } else if (task === 'view all roles') {
    //   db.viewRoles();
    // }
  });

};

init();