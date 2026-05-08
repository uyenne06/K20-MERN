import { Request } from 'express'
import sharp from 'sharp'
import fs from 'fs'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getNameFormFileName, handleUploadSingleImage } from '~/utils/file'

class MediasServices {
  //
  async uploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    file.newFilename = getNameFormFileName(file.newFilename) + '.jpg'
    //tạo đường dẫn mà mình sẽ lưu file
    const newPath = UPLOAD_IMAGE_DIR + '/' + file.newFilename
    //sharp | file.filePath: là đường dẫn lưu trữ trong temp
    await sharp(file.filepath as string)
      .jpeg()
      .toFile(newPath)
    //lưu vào folder chính thức(newPath)
    //xóa file cũ đi
    fs.unlinkSync(file.filepath)
    //trả ra đường link để ngưởi dùng xài
    return `http://localhost:3000/static/image/${file.newFilename}`
  }
}
//dependency inject
const mediasServices = new MediasServices()
export default mediasServices
