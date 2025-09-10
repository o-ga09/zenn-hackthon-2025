import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React from 'react'

export default function UploadedVideos() {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }
  return (
    <>
      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold">アップロード済み写真 ({uploadedFiles.length}枚)</h4>
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file) || '/placeholder.svg'}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
