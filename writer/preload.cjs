const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('tinkerDesktop',{chooseRepo:()=>ipcRenderer.invoke('repo:choose'),save:(file,content)=>ipcRenderer.invoke('repo:save',file,content),openGitHub:()=>ipcRenderer.invoke('repo:open-github'),currentRepo:()=>ipcRenderer.invoke('repo:current')});
