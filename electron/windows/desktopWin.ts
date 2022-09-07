import { BrowserWindow, app } from 'electron'

// eslint-disable-next-line import/no-mutable-exports
let desktopWin: BrowserWindow | null = null
function openDesktopWindow(preload: string, indexHtml: string, url: string, params: { video: string; poster: string }) {
  if (desktopWin) {
    setDesktopWinLoad(indexHtml, url, params.video, params.poster)
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
    desktopWin.setFullScreen(true)

    setDesktopWinLoad(indexHtml, url, params.video, params.poster)
  }
}

function setDesktopWinLoad(indexHtml: string, url: string, video: string, poster: string) {
  if (app.isPackaged)
    desktopWin!.loadFile(indexHtml, { hash: `desktop/?video=${video}&poster=${poster}` })
  else
    desktopWin!.loadURL(`${url}/#/desktop/?video=${video}&poster=${poster}`)
}

export {
  openDesktopWindow,
}
