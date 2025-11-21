import { defineEventHandler, readMultipartFormData } from 'h3'
import { writeFile } from 'fs/promises'
import { join } from 'path'

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

        // Генерируем уникальное имя файла
        const timestamp = Date.now()
        const extension = imageFile.filename?.split('.').pop() || 'png'
        const fileName = `image-${timestamp}.${extension}`
        const uploadPath = join(process.cwd(), 'public', 'uploads', fileName)

        // Сохраняем файл
        await writeFile(uploadPath, imageFile.data)

        // Возвращаем URL для доступа к файлу
        return {
            imageUrl: `/uploads/${fileName}`
        }

    } catch (error) {
        console.error('Error uploading image:', error)
        throw createError({
            statusCode: 500,
            message: 'Ошибка при загрузке изображения'
        })
    }
})