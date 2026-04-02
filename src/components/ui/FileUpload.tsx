'use client';

import React, { useState } from 'react';
import { Upload, Lock, AlertCircle } from 'lucide-react';
import { UploadedDocument } from '@/types';
import { Card, CardContent } from './Card';
import { Input } from './Input';
import { Button } from './Button';

interface FileUploadProps {
  title: string;
  description: string;
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  title,
  description,
  onFileSelect,
  accept = '.pdf,.jpg,.png',
  maxSize = 5 * 1024 * 1024,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedDocument | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.size > maxSize) {
      alert(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
      return;
    }

    // Simulate password-protected PDF detection
    if (file.name.toLowerCase().includes('protected') || Math.random() < 0.1) {
      setIsPasswordProtected(true);
      return;
    }

    setUploadedFile({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      status: 'ready',
      file,
    });
    onFileSelect(file);
  };

  const handlePasswordSubmit = () => {
    // Simple mock validation
    if (password.length < 4) {
      setPasswordError('Incorrect password. Please check and try again.');
      return;
    }
    setIsPasswordProtected(false);
    setPassword('');
    setPasswordError('');
    // In a real scenario, you'd validate the password with backend
  };

  if (isPasswordProtected) {
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="bg-slate-100 rounded-full p-4">
              <Lock className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Document is password protected</h3>
            <p className="text-sm text-slate-600 text-center max-w-sm">
              This bank statement is encrypted. Enter the password provided by your bank to unlock
              and process it securely.
            </p>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              hint="Usually provided in your bank email"
            />
            <Button onClick={handlePasswordSubmit} className="w-full mt-2">
              Unlock Document
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsPasswordProtected(false);
                setPassword('');
                setPasswordError('');
              }}
              className="w-full"
            >
              Try Different File
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="cursor-pointer block">
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-10 h-10 text-slate-400" />
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
          {!uploadedFile && (
            <p className="text-xs text-slate-500 mt-2">
              Click or drag file to upload — PDF, JPG or PNG (Max 5MB)
            </p>
          )}
        </div>
        <input
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
      </label>

      {uploadedFile && (
        <div className="mt-4 p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
              📄
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-900">{uploadedFile.name}</p>
              <p className="text-xs text-slate-500">{uploadedFile.size}</p>
            </div>
          </div>
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
            Ready for extraction
          </span>
        </div>
      )}
    </div>
  );
};
