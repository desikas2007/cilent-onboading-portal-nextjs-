'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';
import { SectionHeader } from '@/components/onboarding/SectionHeader';
import { NavigationButtons } from '@/components/onboarding/NavigationButtons';
import { useOnboarding } from '@/hooks/useOnboarding';
import { CheckCircle, Trash2, File } from 'lucide-react';

export default function UploadFormsPage() {
  const router = useRouter();
  const { formData, updateSection, setCurrentStep } = useOnboarding();
  const [uploadedCount, setUploadedCount] = useState(0);

  // Track uploaded documents
  useEffect(() => {
    const count = Array.isArray(formData.uploadedDocuments) ? formData.uploadedDocuments.length : 0;
    setUploadedCount(count);
  }, [formData.uploadedDocuments]);

  const handleFileSelect = (documentType: string, file: File) => {
    // Get existing documents or initialize as empty array
    const existingDocs = Array.isArray(formData.uploadedDocuments) ? formData.uploadedDocuments : [];
    
    // Add or update the document
    const updatedDocs = existingDocs.filter((doc: any) => doc.type !== documentType);
    updatedDocs.push({
      type: documentType,
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      status: 'ready',
      uploadDate: new Date().toISOString(),
    });
    
    updateSection('uploadedDocuments', updatedDocs);
  };

  const handleRemoveFile = (documentType: string) => {
    const existingDocs = Array.isArray(formData.uploadedDocuments) ? formData.uploadedDocuments : [];
    const updatedDocs = existingDocs.filter((doc: any) => doc.type !== documentType);
    updateSection('uploadedDocuments', updatedDocs);
  };

  const handleNext = () => {
    setCurrentStep(3);
    router.push('/onboarding/tds-summary');
  };

  const handleSave = () => {
    alert(`Forms saved! ${uploadedCount} of 3 forms uploaded.`);
  };

  const isForm26ASUploaded = Array.isArray(formData.uploadedDocuments) && 
    formData.uploadedDocuments.some((d: any) => d.type === 'form26AS');
  const isFormTISUploaded = Array.isArray(formData.uploadedDocuments) && 
    formData.uploadedDocuments.some((d: any) => d.type === 'formTIS');
  const isFormAISUploaded = Array.isArray(formData.uploadedDocuments) && 
    formData.uploadedDocuments.some((d: any) => d.type === 'formAIS');

  return (
    <div>
      <SectionHeader 
        title="Upload Documents" 
        description={`${uploadedCount} of 3 documents uploaded`}
      />

      {/* Upload Status */}
      <Card className="mb-6 bg-slate-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              {isForm26ASUploaded && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
              <span className={`text-sm font-medium ${isForm26ASUploaded ? 'text-green-700' : 'text-slate-600'}`}>
                {isForm26ASUploaded ? '✓ Form 26AS' : '○ Form 26AS'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {isFormTISUploaded && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
              <span className={`text-sm font-medium ${isFormTISUploaded ? 'text-green-700' : 'text-slate-600'}`}>
                {isFormTISUploaded ? '✓ Form TIS' : '○ Form TIS'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {isFormAISUploaded && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
              <span className={`text-sm font-medium ${isFormAISUploaded ? 'text-green-700' : 'text-slate-600'}`}>
                {isFormAISUploaded ? '✓ Form AIS' : '○ Form AIS'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <FileUpload
          title="Form 26AS"
          description="Annual Tax Statement showing tax credits, TDS, and TCS details."
          onFileSelect={(file) => handleFileSelect('form26AS', file)}
        />

        <FileUpload
          title="Form TIS"
          description="Taxpayer Information Summary containing categorised financial activities."
          onFileSelect={(file) => handleFileSelect('formTIS', file)}
        />

        <FileUpload
          title="Form AIS"
          description="Annual Information Statement providing comprehensive details of financial transactions."
          onFileSelect={(file) => handleFileSelect('formAIS', file)}
        />
      </div>

      {/* Uploaded Files List */}
      {Array.isArray(formData.uploadedDocuments) && formData.uploadedDocuments.length > 0 && (
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.uploadedDocuments.map((doc: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 flex-1">
                    <File className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.size} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(doc.type)}
                    className="ml-2 p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Button - Positioned at Bottom */}
      <div className="mt-12">
        <NavigationButtons
          onBack={() => router.back()}
          onSave={handleSave}
          onNext={handleNext}
          canGoBack={true}
          canGoNext={uploadedCount === 3}
          backText="Back"
          nextText={uploadedCount === 3 ? '✓ All Forms Uploaded - Next' : `Upload All 3 Forms (${uploadedCount}/3)`}
        />
      </div>
    </div>
  );
}
