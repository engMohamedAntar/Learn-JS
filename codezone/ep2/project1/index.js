#!/user/bin/env node

import { Command } from "commander";
import fs from "node:fs";

const program = new Command();
import inquirer from "inquirer";

const questions = [
  {
    type: "input",
    name: "title",
    message: "Enter course title",
  },
  {
    type: "number",
    name: "price",
    message: "Enter course price",
  },
];

const filePath = "./courses.json";
program
  .name("antar0-courses-manager")
  .description("CLI to make courses")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .description("Add a course")
  .action(() => {
    inquirer.prompt(questions)
    .then((answers) => {
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, "utf-8", (err, fileContent) => {
          if (err) {
            console.log("Error", err);
            process.exit();
          }
          const fullCont = JSON.parse(fileContent);
          fullCont.push(answers);
          fs.writeFile(filePath,JSON.stringify(fullCont), "utf-8", () => {
            console.log("File have been added successfully2");
          });
        });
      } else {
        fs.writeFile(filePath, JSON.stringify([answers]), "utf-8", () => {
          console.log("File have been added successfully1");
        });
      }
    });
  });

program
  .command('list')
  .alias('l')
  .description("list all courses")
  .action(()=>{
    fs.readFile(filePath,"utf-8",(err,cont)=>{
        if(err){
            console.log("err: ",err);
            process.exit();
        }
        console.table(JSON.parse(cont));
    })
  })

program.parse(process.argv);
