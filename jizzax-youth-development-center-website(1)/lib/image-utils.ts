const MAX_WIDTH = 1920
const MAX_HEIGHT = 1920
const QUALITY = 0.82
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only JPG, PNG, and WebP images are allowed.'
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be under 5 MB.'
  }
  return null
}

/**
 * Resize and compress an image file client-side using canvas.
 * Returns an optimized Blob ready for upload.
 */
export async function optimizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      let { width, height } = img

      // Only resize if the image exceeds max dimensions
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Could not create canvas context'))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)

      // Output as WebP for best compression, fallback to JPEG
      const outputType = 'image/webp'

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'))
            return
          }
          resolve(blob)
        },
        outputType,
        QUALITY
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }

    img.src = url
  })
}

/**
 * Generate a unique filename for storage upload
 */
export function generateFileName(originalName: string): string {
  const ext = 'webp' // We always output webp after optimization
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const baseName = originalName
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .substring(0, 40)
  return `${baseName}-${timestamp}-${random}.${ext}`
}
