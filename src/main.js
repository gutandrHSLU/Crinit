const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')
const Chart = require('chart.js');



const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.webContents.openDevTools()
  win.loadFile('./src/index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('returnChart', returnChart)
  createWindow();

  // On mac: open window when none are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Open Material',
    defaultPath: path.join(__dirname, '../usr/materials'),
    buttonLabel: 'Open Material',
    filters: [
      { name: 'Materials', extensions: ['json'] }
    ],
    properties: ['openFile']}
  )
  if (canceled) {
    return
  } else {
    console.log(filePaths);
    let material = JSON.parse(fs.readFileSync(filePaths[0]))
    return material
  }
}

async function returnChart() {
  let chart = new Chart();
  return chart
}
