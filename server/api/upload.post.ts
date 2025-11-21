import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { writeFile, mkdir, access } from 'fs/promises'
import { join } from 'path'
import { constants } from 'fs'

export default defineEventHandler(async (event) => {
    try {
        const files = await readMultipartFormData(event)
        const imageFile = files?.find(file => file.name === 'image')

        if (!imageFile) {
            throw createError({
                statusCode: 400,
                message: 'Файл изображения не найден'
            })
        }

        // Определяем путь к директории uploads
        // В Docker контейнере process.cwd() = /app
        const uploadsDir = join(process.cwd(), 'public', 'uploads')
        
        try {
            // Проверяем доступ к директории
            await access(uploadsDir, constants.F_OK | constants.W_OK)
        } catch (accessError) {
            // Если директории нет или нет прав, пытаемся создать
            try {
                await mkdir(uploadsDir, { recursive: true, mode: 0o755 })
            } catch (mkdirError: any) {
                console.error('Error creating uploads directory:', mkdirError)
                throw createError({
                    statusCode: 500,
                    message: `Не удалось создать директорию для загрузки: ${mkdirError.message || 'Неизвестная ошибка'}`
                })
            }
        }

        // Генерируем уникальное имя файла
        const timestamp = Date.now()
        const extension = imageFile.filename?.split('.').pop() || 'png'
        const fileName = `image-${timestamp}.${extension}`
        const uploadPath = join(uploadsDir, fileName)

        // Сохраняем файл
        try {
            await writeFile(uploadPath, imageFile.data)
        } catch (writeError: any) {
            console.error('Error writing file:', writeError)
            console.error('Upload path:', uploadPath)
            console.error('Uploads dir:', uploadsDir)
            console.error('Current working directory:', process.cwd())
            throw createError({
                statusCode: 500,
                message: `Не удалось сохранить файл: ${writeError.message || 'Неизвестная ошибка'}`
            })
        }

        // Возвращаем URL для доступа к файлу
        return {
            imageUrl: `/uploads/${fileName}`
        }

    } catch (error: any) {
        console.error('Error uploading image:', error)
        
        // Если это уже ошибка с statusCode, пробрасываем её дальше
        if (error.statusCode) {
            throw error
        }
        
        throw createError({
            statusCode: 500,
            message: error.message || 'Ошибка при загрузке изображения'
        })
    }
})