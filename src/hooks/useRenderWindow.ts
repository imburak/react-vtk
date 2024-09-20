import vtkGenericRenderWindow from "@kitware/vtk.js/Rendering/Misc/GenericRenderWindow";
import vtkInteractorStyleMPRSlice from "@kitware/vtk.js/Interaction/Style/InteractorStyleMPRSlice";
import { useEffect, useState } from "react";

export const useRenderWindow = () => {
  const [renderWindow] = useState(
    vtkGenericRenderWindow.newInstance({
      background: [0, 0, 0],
      listenWindowResize: true,
    })
  );
  const [renderer] = useState(renderWindow.getRenderer());
  const [camera] = useState(renderer.getActiveCamera());
  const [iStyle] = useState(vtkInteractorStyleMPRSlice.newInstance());

  useEffect(() => {
    renderWindow.getInteractor().setInteractorStyle(iStyle);
  }, []);

  return { renderWindow, renderer, camera, iStyle };
};
