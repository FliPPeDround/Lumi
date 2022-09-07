import type { BrowserWindow } from 'electron'
import { dialog } from 'electron'
import { ntf2mp4 } from './ntf2mp4'

function downloadFile(win: BrowserWindow, url: string, path: string) {
  let value = 0
  win!.webContents.session.on('will-download', (_event, item) => {
    item.setSavePath(`${path}.ndf`)
    item.on('updated', (_event, state) => {
      if (state === 'progressing') {
        // 此处  用接收到的字节数和总字节数求一个比例  就是进度百分比
        if (item.getReceivedBytes() && item.getTotalBytes())
          value = 100 * (item.getReceivedBytes() / item.getTotalBytes())
        // 把百分比发给渲染进程进行展示
        win!.webContents.send('updateProgressing', value)
        // mac 程序坞、windows 任务栏显示进度
        win!.setProgressBar(value)
      }
      else if (state === 'interrupted') {
        dialog.showErrorBox('下载失败', `文件 ${item.getFilename()} 因为某些原因被中断下载`)
      }
    })
    item.on('done', async (_event, state) => {
      // 如果窗口还在的话，去掉进度条
      await ntf2mp4(path)
      if (!win!.isDestroyed())
        win!.setProgressBar(-1)

      // 下载被取消或中断了
      if (state === 'interrupted')
        dialog.showErrorBox('下载失败', `文件 ${item.getFilename()} 因为某些原因被中断下载`)
    })
  })

  win!.webContents.downloadURL(url)
}

export {
  downloadFile,
}
