"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [productId, setProductId] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setMessage('')
    } else {
      setMessage('Please select a valid image file')
      setFile(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select an image file')
      return
    }

    setLoading(true)
    setMessage('Uploading...')

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('productId', productId)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setMessage(`Image uploaded successfully! Image ID: ${data.imageId}`)
        setFile(null)
        setProductId('')
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`Upload failed: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Upload Images</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Image to MongoDB</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file-input">Select Image</Label>
            <Input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1"
            />
            {file && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="product-id">Product ID (Optional)</Label>
            <Input
              id="product-id"
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Leave empty to upload image without association"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              You can associate this image with a product later by using the Image ID
            </p>
          </div>

          <Button 
            onClick={handleUpload} 
            disabled={loading || !file}
            className="w-full"
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </Button>
          
          {file && (
            <div className="text-sm text-blue-600">
              ✓ Ready to upload: {file.name}
            </div>
          )}

          {message && (
            <div className={`p-3 rounded ${
              message.includes('Error') || message.includes('failed') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
                     <div className="space-y-2 text-sm">
             <p>1. Select an image file (JPG, PNG, etc.)</p>
             <p>2. Optionally enter a product ID to associate the image</p>
             <p>3. Click "Upload Image"</p>
             <p>4. Copy the returned Image ID</p>
             <p>5. Use the Image ID in your product/service data</p>
             <p className="text-blue-600 font-medium">Note: Product ID is optional - you can upload images without associating them immediately</p>
           </div>
        </CardContent>
      </Card>
    </main>
  )
} 