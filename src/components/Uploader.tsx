import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useImage } from "../contexts/ImageContext";
import { Spinner } from "@nextui-org/react";

function Uploader() {
  const { openImage } = useImage();
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && !loading) {
      setLoading(true);
      await openImage(acceptedFiles);
      setLoading(false);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/dicom": [".dcm"],
      "application/gzip": [".nii.gz"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border flex items-center justify-center border-slate-600 w-[600px]	h-96	border-dashed rounded-md`}
    >
      <input {...getInputProps()} />{" "}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </>
      )}
    </div>
  );
}

export default Uploader;
