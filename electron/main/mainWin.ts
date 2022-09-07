import { BrowserWindow, app, shell } from 'electron'

// eslint-disable-next-line import/no-mutable-exports
let mainWin: BrowserWindow | null = null

async function createWindow(preload: string, indexHtml: string, url: string) {
  mainWin = new BrowserWindow({
    titleBarStyle: 'hiddenInset',
    autoHideMenuBar: true,
    width: 1030,
    height: 690,
    resizable: false,
    title: 'Lumi',
    skipTaskbar: true,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (app.isPackaged)
    mainWin.loadFile(indexHtml)

  else
    mainWin.loadURL(url)

  // Test actively push message to the Electron-Renderer
  mainWin.webContents.on('did-finish-load', () => {
    mainWin?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the
  mainWin.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:'))
      shell.openExternal(url)
    return { action: 'deny' }
  })
}
export {
  createWindow,
  mainWin,
}
