const { contextBridge, ipcRenderer } = require('electron')
// const Chart = require('chart.js');

contextBridge.exposeInMainWorld('electronAPI',{
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  returnChart: (chart, config) => ipcRenderer.invoke('returnChart', chart, config),
  testIPC: (message) => ipcRenderer.invoke('testIPC', message)
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
