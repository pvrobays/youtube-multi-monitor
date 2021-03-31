const { app, BrowserWindow } = require('electron');
const path = require('path');
const { MultiMonitor } = require('electron-multi-monitor');

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  
  const multiMonitor = MultiMonitor.instance;

  const url = path.join(__dirname, 'build/index.html');
  // const url = "http://localhost:3000/";

  multiMonitor.openUrl(url, 1).then(() => {
    console.log("YouTube multi monitor is loaded!");
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});