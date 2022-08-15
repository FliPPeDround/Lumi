import fs from 'fs'
import { join } from 'path'
import { httpAxios } from './httpAxios'
const { createReadStream, createWriteStream, unlinkSync } = fs

const temDownloadPath = join(process.env.HOME!, 'Library', 'Application Support', 'Lumi', 'download.ndf')
export const downloadLumiVideo = async (url: string, path: string) => {
  const res = await httpAxios({
    method: 'get',
    url,
    responseType: 'stream',
  })

  res.data.pipe(createWriteStream(temDownloadPath)).on('finish', () => {
    const readStream = createReadStream(temDownloadPath)
    let videoHEX = ''

    readStream.setEncoding('hex')
    readStream.on('data', (chunk) => {
      videoHEX += chunk
    })

    readStream.on('end', () => {
      videoHEX = videoHEX.slice(4)
      const writerStream = createWriteStream(`public/${path}`)

      writerStream.write(videoHEX, 'hex')
      writerStream.end()

      writerStream.on('finish', () => {
        // removeSync('download.ndf')
        unlinkSync(temDownloadPath)
      })

      writerStream.on('error', (_err) => {
        // removeSync('download.ndf')
        unlinkSync(temDownloadPath)
        throw new Error('Error writing file')
      })
    })

    readStream.on('error', (_err) => {
      // removeSync('download.ndf')
      unlinkSync(temDownloadPath)
      throw new Error('Error reading file')
    })
  })
}
