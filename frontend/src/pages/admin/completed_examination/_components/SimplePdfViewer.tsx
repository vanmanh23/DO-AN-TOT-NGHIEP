import React, { useEffect, useState } from 'react';

interface PdfViewerProps {
  data: Uint8Array; // Dữ liệu byte[] đầu vào
}

const SimplePdfViewer: React.FC<PdfViewerProps> = ({ data }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // 1. Tạo Blob từ mảng byte với MIME type là application/pdf
    const blob = new Blob([data], { type: 'application/pdf' });
    
    // 2. Tạo Object URL
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    // 3. Cleanup: Xóa URL khi component unmount để tránh leak bộ nhớ
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [data]);

  if (!pdfUrl) return <div>Đang tải PDF...</div>;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="PDF Preview"
      />
    </div>
  );
};

export default SimplePdfViewer;