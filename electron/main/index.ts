import { join } from 'path'
import { BrowserWindow, app, ipcMain } from 'electron'
import { downloadFile } from '../utils'
import { createWindow, mainWin } from './../windows/mainWin'
import { openDesktopWindow } from './../windows/desktopWin'

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

export const ROOT_PATH = {
  dist: join(__dirname, '../..'),
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

const preload = join(__dirname, '../preload/index.js')
const url = `http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')

app.whenReady().then(() => createWindow(preload, indexHtml, url))

app.on('window-all-closed', () => {
  // mainWin = null
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('second-instance', () => {
  if (mainWin) {
    // Focus on the main window if the user tried to open another
    if (mainWin.isMinimized())
      mainWin.restore()
    mainWin.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length)
    allWindows[0].focus()

  else
    createWindow(preload, indexHtml, url)
})

ipcMain.handle('openDesktopWindow', async (_event, params: { video: string; poster: string }) => {
  openDesktopWindow(preload, indexHtml, url, params)
})

ipcMain.handle('downloadLumiVideo', async (_event, params: { url: string; path: string }) => {
  downloadFile(mainWin!, params.url, join(ROOT_PATH.public, params.path))
})
