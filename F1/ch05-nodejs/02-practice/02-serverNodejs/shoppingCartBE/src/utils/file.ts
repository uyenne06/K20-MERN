// chứa các function xử lý file
// tạo hàm tự tạo folder uploads
import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs' //file system(tạo|tìm|xóa|thêm thư mục)
import path from 'path'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

export const handleUploadSingleImage = (req: Request) => {
  //tiếp nhận file từ req, kiểm tra formidable và lưu tạm
  const form = formidable({
    uploadDir: path.resolve(UPLOAD_IMAGE_TEMP_DIR),
    keepExtensions: true, //giữ lại đuôi file dc gửi lên
    maxFiles: 1,
    maxFileSize: 300 * 1024, //300kb
    filter: function ({ name, originalFilename, mimetype }) {
      //name là trường dữ liệu được gửi từ form
      //orginalFilename: tên gốc của fi;e
      //mimetype: loại file của type
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) form.emit('error' as any, new Error('Not File Type') as any)
      return valid
    }
  })
  //parse dữ liệu từ form của req do client gửi lên
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      //nếu k có lỗi do quá trình parse
      if (!files.image) {
        return reject(new Error('Image is empty'))
      }
      //nếu mà có gửi và đầy đủ thì
      return resolve(files.image[0] as File)
    })
  })
}

//áewufas.áewufas.áewufas.png ===> áewufas.áewufas.áewufas
export const getNameFormFileName = (filename: string) => {
  const nameArr = filename.split('.')
  return nameArr.pop()
}
