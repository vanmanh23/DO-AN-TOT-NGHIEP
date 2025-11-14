import { Upload } from "lucide-react";
import { uploadDicomImg } from "../../../../apis/dicomApis";
import { toast } from "sonner";

type MoreInfoProps = {
  count: number;
  size: number;
};

export default function MoreFunctions({ count, size }: MoreInfoProps) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  try {
    const result = await uploadDicomImg(e);
    toast.success("Upload Dicom images successfully!", { duration: 2000, position: "bottom-right",richColors: true }, );
    console.log("result-------: ", result);
    window.location.reload();
  } catch(error) {
    toast.error(`${error.response.data}`, { duration: 2000, position: "bottom-right", richColors: true }, );
  }
};

  return (
    <div className="flex w-full 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-between gap-2 xl:text-base lg:text-base md:text-base sm:text-sm text-sm">
      <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col md:gap-5 gap-2 w-full h-fit">
        <div className="md:py-2 md:px-2 p-1 2xl:w-1/4 xl:w-1/4 lg:w-1/4 md:w-1/4 sm:w-full rounded-md border border-gray-300">
          <p className="font-medium">
            Number of elements: <span className="font-bold">{count}</span>
          </p>
        </div>
        <div className="md:py-2 md:px-2 p-1 2xl:w-1/4 xl:w-1/4 lg:w-1/4 md:w-1/4 sm:w-full rounded-md border border-gray-300">
          <p className="font-medium">
            File size: <span className="font-bold">{size} MB</span>
          </p>
        </div>
      </div>
      <div className="md:w-1/4 w-full">
        <input type="file" multiple id="upload-input" accept=".dcm"  className="hidden" onChange={handleUpload}/>
      <label
        htmlFor="upload-input"
        className="lg:w-full md:w-full sm:w-full h-fit"
      >
        <div className="bg-bg-secondary hover:bg-bg-secondary/70 cursor-pointer md:p-2 p-1 rounded-md text-white flex flex-row gap-2 w-full items-center justify-center">
          <Upload fontWeight={"bold"} className="md:w-4 md:h-4 w-3 h-3"/>
          <p className="font-semibold text-sm"> Upload dicom object </p>
        </div>
      </label>
      </div>
    </div>
  );
}
