import React, { useRef } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropImageModal = ({ image, onCrop, onClose }) => {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      cropperRef.current.cropper.getCroppedCanvas().toBlob(
        (blob) => {
          const file = new File([blob], "cropped-image.jpg", {
            type: "image/jpeg",
          });
          onCrop(file); // Pass the valid file to the parent
        },
        "image/jpeg" // Specify the MIME type
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Crop Your Image</h2>
        <Cropper
          src={image}
          style={{ height: 300, width: "100%" }}
          aspectRatio={1}
          guides={false}
          ref={cropperRef}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleCrop}
          >
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImageModal;
