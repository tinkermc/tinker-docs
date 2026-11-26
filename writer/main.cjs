const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const fs = require('node:fs/promises'); const path = require('node:path');
const { spawn } = require('node:child_process');
let repo = '';
let docsServer;
function createWindow(){const win=new BrowserWindow({width:1440,height:960,minWidth:900,minHeight:640,backgroundColor:'#f8faf9',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false}}); if(!app.isPackaged)win.loadURL('http://127.0.0.1:5174');else win.loadFile(path.join(__dirname,'../writer-dist/index.html'));}
app.whenReady().then(createWindow); app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
ipcMain.handle('repo:choose',async()=>{const r=await dialog.showOpenDialog({properties:['openDirectory']});if(r.canceled)return null;repo=r.filePaths[0];return repo});
ipcMain.handle('repo:save',async(_,file,content)=>{if(!repo)throw new Error('Choose the Tinker Docs repository first.');const safe=path.basename(file).replace(/[^a-z0-9-_.]/gi,'-')+'.mdx';const target=path.join(repo,'src','pages','contributing',safe);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,content,'utf8');return target});
ipcMain.handle('repo:open-github',async()=>{if(!repo)throw new Error('Choose the Tinker Docs repository first.');await shell.openPath(repo);return repo});
ipcMain.handle('repo:current',()=>repo);
ipcMain.handle('repo:preview',async(_,slug)=>{if(!repo)throw new Error('Choose the Tinker Docs repository first.');if(!docsServer){docsServer=spawn(process.platform==='win32'?'npm.cmd':'npm',['run','dev','--','--host','127.0.0.1'],{cwd:repo,stdio:'ignore',shell:process.platform==='win32'});await new Promise(r=>setTimeout(r,3500));}return `http://127.0.0.1:5173/contributing/${slug}`});
