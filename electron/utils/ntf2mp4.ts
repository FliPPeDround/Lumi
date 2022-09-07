// import { join } from 'path'
import fs from 'fs-extra'

const { createReadStream, createWriteStream, removeSync } = fs
// const temDownloadPath = join(process.env.HOME!, 'Library', 'Application Support', 'Lumi', 'download.ndf')

async function ntf2mp4(path: string) {
  const readStream = createReadStream(`${path}.ndf`)
  let videoHEX = ''

  readStream.setEncoding('hex')
  readStream.on('data', (chunk) => {
    videoHEX += chunk
  })

  readStream.on('end', () => {
    videoHEX = videoHEX.slice(4)
    const writerStream = createWriteStream(`${path}.mp4`)

    writerStream.write(videoHEX, 'hex')
    writerStream.end()

    writerStream.on('finish', () => {
      removeSync(`${path}.ndf`)
    })

    writerStream.on('error', (_err) => {
      removeSync(`${path}.ndf`)
      throw new Error('Error writing file')
    })
  })

  readStream.on('error', (_err) => {
    removeSync(`${path}.ndf`)
    throw new Error('Error reading file')
  })
}

export {
  ntf2mp4,
}
