import fs from 'fs'
import { httpAxios } from './httpAxios'
const { createReadStream, createWriteStream, unlinkSync } = fs

// axios.defaults.adapter = require('axios/lib/adapters/http')
export const downloadLumiVideo = async (url: string, path: string) => {
  const res = await httpAxios({
    method: 'get',
    url,
    responseType: 'stream',
  })

  res.data.pipe(createWriteStream('download.ndf')).on('finish', () => {
    const readStream = createReadStream('download.ndf')
    let videoHEX = ''

    readStream.setEncoding('hex')
    readStream.on('data', (chunk) => {
      videoHEX += chunk
    })

    readStream.on('end', () => {
      videoHEX = videoHEX.slice(4)
      const writerStream = createWriteStream(path)

      writerStream.write(videoHEX, 'hex')
      writerStream.end()

      writerStream.on('finish', () => {
        // removeSync('download.ndf')
        unlinkSync('download.ndf')
      })

      writerStream.on('error', (_err) => {
        // removeSync('download.ndf')
        unlinkSync('download.ndf')
        throw new Error('Error writing file')
      })
    })

    readStream.on('error', (_err) => {
      // removeSync('download.ndf')
      unlinkSync('download.ndf')
      throw new Error('Error reading file')
    })
  })
}
