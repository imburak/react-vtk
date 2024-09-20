import { useEffect, useRef } from "react";
import { useRenderWindow } from "../hooks/useRenderWindow";
import vtkVolume from "@kitware/vtk.js/Rendering/Core/Volume";
import vtkVolumeMapper from "@kitware/vtk.js/Rendering/Core/VolumeMapper";
import { useImage } from "../contexts/ImageContext";
import { viewProps } from "../config";

function SliceView(props: (typeof viewProps)[number]) {
  const container = useRef<HTMLDivElement>(null);
  const { renderWindow, renderer, iStyle, camera } = useRenderWindow();
  const { image } = useImage();

  useEffect(() => {
    if (container.current) renderWindow.setContainer(container.current);
    const actor = vtkVolume.newInstance();
    const mapper = vtkVolumeMapper.newInstance();
    actor.setMapper(mapper);
    mapper.setInputData(image);

    iStyle.setVolumeMapper(mapper);
    iStyle.setSliceNormal(...props.sliceNormal);
    camera.setDirectionOfProjection(
      props.direction[0],
      props.direction[1],
      props.direction[2]
    );
    camera.setViewUp(props.viewUp[0], props.viewUp[1], props.viewUp[2]);
    const range = iStyle.getSliceRange();
    iStyle.setSlice((range[0] + range[1]) / 2);

    renderer.addVolume(actor);

    renderWindow.getRenderWindow().render();
  }, []);

  return <div className="" ref={container}></div>;
}

export default SliceView;
