import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { unlink } from 'fs/promises'
import sharp from 'sharp'
import BadRequestError from '../errors/bad-request-error'

const removeFile = async (filePath: string) => {
    try {
        await unlink(filePath)
    } catch {
    }
}

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }

    const filePath = req.file.path

    try {
        if (req.file.size < 2 * 1024) {
            await removeFile(filePath)
            return next(
                new BadRequestError('Размер файла должен быть больше 2 Кб')
            )
        }

        const metadata = await sharp(filePath).metadata()
        if (!metadata.format) {
            await removeFile(filePath)
            return next(new BadRequestError('Некорректный файл изображения'))
        }

        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file.filename}`

        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file.originalname,
        })
    } catch (error) {
        await removeFile(filePath)
        return next(new BadRequestError('Некорректный файл изображения'))
    }
}

export default {}