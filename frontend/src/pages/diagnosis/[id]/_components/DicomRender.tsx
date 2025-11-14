type DicomRenderProps = {
  sopInstanceUID: string;
  studyInstanceUID: string;
  seriesInstanceUID: string;
};
export default function DicomRender({
  sopInstanceUID,
  studyInstanceUID,
  seriesInstanceUID,
}: DicomRenderProps) {
  return (
    <div className="w-full h-auto object-cover">
      <div>
          <img src={`http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs/studies/${studyInstanceUID}/series/${seriesInstanceUID}/instances/${sopInstanceUID}/rendered`} alt="dicom" className="w-full rounded border" />
      </div>
    </div>
  );
}
