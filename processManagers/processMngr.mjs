import { spawn } from "child_process";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROCESSES_FILE = path.join(__dirname, "processes.json");



const loadProcess = ()=>{
    if(fs.existsSync(PROCESSES_FILE)){
        return JSON.parse(fs.readFileSync(PROCESSES_FILE, "utf-8"))
    }
    return {}
}

const saveProcess =(pro)=>{
fs.writeFileSync(PROCESSES_FILE,JSON.stringify(pro,null,2))
}


let pro = loadProcess()
export const startProcess =(file)=>{
    const logfile = path.join(__dirname, `${path.basename(file)}.log`)
    const out = fs.openSync(logfile,"a")
    const err =fs.openSync(logfile,"a")
const process =spawn("node",[file],{
    detached:true,
    stdio:["ignore",out,err]
})
process.unref()
pro[process.pid] = {pid:process.pid,file,logfile}
saveProcess(pro)
console.log(`process started with pid ${process.pid} file ${file} . . `);

return process.pid
}


export const stopProcess=(pid)=>{
    pro = loadProcess()
try {
    if(pro[pid]){
        process.kill(pid)
        console.log(`process with ${pid} has been killed . . `);
        delete pro[pid]
    }else{
        console.log(`failed to stop process with pid ${pid}`);
    }
} catch (error) {
        console.log("no process currently runnnig");
        
}
}

export const listProcess=()=>{
    pro = loadProcess()
try {
    if(Object.keys(pro).length === 0){
        console.log("no proccess were running .. .");
    }else{
        console.log("Runnig process are");
        for(const pid in pro){
            console.log(`PID =${pid} and file is ${pro[pid].file}, logs are = ${pro[pid].logfile}`);       
        }
    }
} catch (error) {
    console.log(error);
}
}


