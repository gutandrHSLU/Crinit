const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  returnChart: () => ipcRenderer.invoke('returnChart')
})
//
// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   ping: () => ipcRenderer.invoke('ping'),
//   // we can also expose variables, not just functions
//   },
//   'electronAPI', {loadMaterial: () => ipcRenderer.send('set-loadMaterial')
// })
