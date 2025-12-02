"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";

type FileUploaderProps = {
  setFile: (file: File | null) => void;
  width?: number | string;
  height?: number | string;
  previewSize?: number | string;
  label?: string;
};

export function FileUploader({
  label = "Image/Video", // Updated default label
  setFile,
  width = 300,
  height = 180,
  previewSize = "100%",
}: FileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFileType(file.type.startsWith("video/") ? "video" : "image");
    } else {
      setPreview(null);
      setFileType(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    setFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFileType(file.type.startsWith("video/") ? "video" : "image");
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <p className="text-lg font-medium">{label}</p>
      <div className="relative border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition w-full" style={{ width: "100%", height }} onClick={() => fileInputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        {!preview ? (
          <div className="flex flex-col items-center text-gray-500">
            <Upload className="w-8 h-8 mb-2" />
            <p className="text-sm">Drag & drop or click to upload</p>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
            {/* Conditional Rendering based on fileType */}
            {fileType === "video" ? <video src={preview} controls className="object-cover rounded-xl bg-black" style={{ width: previewSize, height: previewSize }} /> : <img src={preview} alt="Preview" className="object-cover rounded-xl" style={{ width: previewSize, height: previewSize }} />}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-50 z-10"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}

        <input type="file" accept="image/*,video/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
}
