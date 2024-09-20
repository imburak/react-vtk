import { viewProps } from "../config";
import SliceView from "./SliceView";

function Views() {
  return (
    <div className="flex gap-2">
      {viewProps.map((props, index) => (
        <SliceView key={index} {...props} />
      ))}
    </div>
  );
}

export default Views;
