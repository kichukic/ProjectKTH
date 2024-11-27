import { Command } from "commander";
import {startProcess,listProcess,stopProcess} from "./processManagers/processMngr.mjs"
import chalk from "chalk";



const program = new Command();


program.name("service manager").description("for monitoring running services").version("1.0.0")

program.command("start <file>").description(" start a js file").action((file)=>{
    try {
        const pid = startProcess(file)
        console.log(`starting ${file} with pid ${pid} on KTH services . . . .`);
    } catch (error) {
        console.log(`failed to start ${file} error , ${error.message}`); 
    }
})

program.command("stop <pid>").description("stop a running process").action((pid)=>{
   try {
    stopProcess(parseInt(pid, 10))
    console.log(`stopping process with ${pid} .. .. ..`);
   } catch (error) {
    console.log(`error stoping process with id ${pid} error is ${error.message}`);
   }
})

program.command("list").description("list all running process").action(()=>{
 try {
    listProcess()
    console.log(chalk.blue("listing all process"));
 } catch (error) {
    console.log(`failed to list the services , error is ${error.message}`);
    
 }
    
})

program.parse(process.argv)


