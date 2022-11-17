#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const Inquirer = require('inquirer')
const ora = require('ora')
const fsExtra = require('fs-extra')
const figlet = require('figlet')
const { name, version } = require('../package.json')

// 设置首行提示
program.name(name).usage('<command> [option]')
program.version(version, '-v,--version')
  .option('-a,--add', 'add something')
program
  .command('create <project-name>')
  .description('create a new project')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName, cmd) => {
    require('../lib/create')(projectName,cmd)
  })


program.parse(process.argv);
// console.log('You choose: ');
// console.log(`hello ${chalk.blue('world')}`);
// console.log(chalk.bgBlue.red("Hello world!"));
// console.log(
//   chalk.green(
//     "I am a green line " +
//     chalk.blue.underline.bold("with a blue substring") +
//     " that becomes green again!"
//   )
// );
// if (program.opts().add) console.log('  add Something');

// new Inquirer.prompt([
//   {
//     name: 'vue',
//     type: 'checkbox',
//     message: 'Check the features needed for your project:',
//     choices: [
//       {
//         name: "Babel",
//         checked: true,
//       },
//       {
//         name: "TypeScript",
//       },
//       {
//         name: "Progressive Web App (PWA) Support",
//       },
//       {
//         name: "Router",
//       },
//     ],
//   }
// ]).then((data) => {
//   console.log('data', data);
// })

// const spinner = ora('Loading unicorns')
// spinner.start();
// setTimeout(() => {
//   spinner.color = 'yellow'
//   spinner.text = 'Loading rainbows'
//   setTimeout(() => {
//     spinner.succeed();
//   }, 1000)
// }, 1000)

// // spinner.fail()

// console.log(
//   "\r\n" +
//   figlet.textSync('YANG', {
//     font: 'Doom',
//     horizontalLayout: 'full',
//     verticalLayout: 'default',
//     width: 180,
//     whitespaceBreak: true
//   })
// );