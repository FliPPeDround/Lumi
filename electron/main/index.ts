import { release } from 'os'
import { join } from 'path'
import { BrowserWindow, app, ipcMain, shell, dialog } from 'electron'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1'))
  app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32')
  app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')
// import {setWallpaper} from 'wallpaper';

// (async () => {
// await setWallpaper('./../../public/Lumi.jpeg');
// })();

async function createWindow() {
  win = new BrowserWindow({
    icon: join(ROOT_PATH.public, 'app/favicon.ico'),
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
    win.loadFile(indexHtml)

  else
    win.loadURL(url)

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:'))
      shell.openExternal(url)
    return { action: 'deny' }
  })
}

// create DesktopWindow
let desktopWin: BrowserWindow | null = null
function openDesktopWindow(params: { video: string; poster: string }) {
  if (desktopWin) {
    setDesktopWinLoad(params)
  }
  else {
    desktopWin = new BrowserWindow({
      type: 'desktop',
      skipTaskbar: true,
      webPreferences: {
        preload,
        nodeIntegration: true,
        contextIsolation: false,
      },
    })
    desktopWin.setSimpleFullScreen(true)

    setDesktopWinLoad(params)
  }
}

function setDesktopWinLoad(params: { video: string; poster: string }) {
  if (app.isPackaged)
    desktopWin!.loadFile(indexHtml, { hash: `desktop/?video=${params.video}&poster=${params.poster}` })
  else
    desktopWin!.loadURL(`${url}/#/desktop/?video=${params.video}&poster=${params.poster}`)
}

ipcMain.handle('openDesktopWindow', async (_event, params: { video: string; poster: string }) => {
  openDesktopWindow(params)
})

ipcMain.handle('downloadLumiVideo', async (_event, params: { url: string; path: string }) => {
  // await downloadLumiVideo(params.url, params.path)
  let value = 0
  win.webContents.session.on('will-download', (_event, item) => {
    item.setSavePath(ROOT_PATH.public + params.path)
    item.on('updated', (evt, state) => {
      if (state === 'progressing') {
        // 此处  用接收到的字节数和总字节数求一个比例  就是进度百分比
        if (item.getReceivedBytes() && item.getTotalBytes())
          value = 100 * (item.getReceivedBytes() / item.getTotalBytes())
        // 把百分比发给渲染进程进行展示
        win.webContents.send('updateProgressing', value)
        // mac 程序坞、windows 任务栏显示进度
        win.setProgressBar(value)
      }
    })
    item.on('done', (_event, state) => {
      // 如果窗口还在的话，去掉进度条
      if (!win.isDestroyed())
        win.setProgressBar(-1)

      // 下载被取消或中断了
      if (state === 'interrupted')
        dialog.showErrorBox('下载失败', `文件 ${item.getFilename()} 因为某些原因被中断下载`)
    })
  })

  win.webContents.downloadURL(params.url)
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized())
      win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length)
    allWindows[0].focus()

  else
    createWindow()
})

// new window example arg: new windows url
// ipcMain.handle('open-win', (event, arg) => {
//   const childWindow = new BrowserWindow({
//     webPreferences: {
//       preload,
//     },
//   })

//   if (app.isPackaged)
//     childWindow.loadFile(indexHtml, { hash: arg })

//   else
//     childWindow.loadURL(`${url}/#${arg}`)
//     // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
// })
