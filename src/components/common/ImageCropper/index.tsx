import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useState } from "react";

const ImageCropper = ({
  avatarUrl,
  cancelEdit,
  setCropper,
}: {
  avatarUrl: string;
  cancelEdit: () => void;
  setCropper: any;
}) => {
  return (
    <>
      <Cropper
        src={avatarUrl}
        style={{ height: "450px", width: "450px" }}
        aspectRatio={1}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        guides={false}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
    </>
  );
};

export default ImageCropper;
