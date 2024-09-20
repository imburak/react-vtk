import { readImageDicomFileSeries } from "@itk-wasm/dicom";
import { readImage } from "@itk-wasm/image-io";
import vtkImageData from "@kitware/vtk.js/Common/DataModel/ImageData";
import vtkITKHelper from "@kitware/vtk.js/Common/DataModel/ITKHelper";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import type { ReactNode } from "react";

type Context = { openImage: (f: File[]) => void; image?: vtkImageData };

const ImageContext = createContext({} as Context);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<vtkImageData>();

  const openImage = async (files: File[]) => {
    try {
      if (files.length == 1) {
        const series = await readImage(files[0]);
        const imageData = vtkITKHelper.convertItkToVtkImage(series.image);
        series.webWorker.terminate();
        setImage(imageData);
      } else {
        const series = await readImageDicomFileSeries({ inputImages: files });
        const imageData = vtkITKHelper.convertItkToVtkImage(series.outputImage);
        series.webWorkerPool?.terminateWorkers();
        setImage(imageData);
      }
    } catch (error) {
      toast.error("Can't open your files!", { theme: "colored" });
    }
  };

  return (
    <ImageContext.Provider value={{ openImage, image }}>
      {children}
    </ImageContext.Provider>
  );
}

export const useImage = () => useContext(ImageContext);
