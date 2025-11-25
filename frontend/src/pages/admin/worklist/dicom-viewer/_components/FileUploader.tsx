import React from "react";

interface Props {
  onFilesSelected: (files: FileList) => void;
}

const FileUploader: React.FC<Props> = ({ onFilesSelected }) => {
  return (
    <div className="p-4 border mb-4">
      <input
        type="file"
        accept=".dcm"
        multiple
        onChange={(e) => {
          if (e.target.files) onFilesSelected(e.target.files);
        }}
      />
    </div>
  );
};

export default FileUploader;
