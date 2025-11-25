import { volumeLoader } from '@cornerstonejs/core';

async function cropImageVolume(volume, cropPercent = 0.05) {
  const imageData = volume.imageData;

  const dims = imageData.getDimensions(); // [x, y, z]
  const spacing = imageData.getSpacing();
  const direction = imageData.getDirection();
  const origin = imageData.getOrigin();

  const [dimX, dimY, dimZ] = dims;

  // Tính crop vùng mới
  const xMin = Math.floor(dimX * cropPercent);
  const xMax = Math.floor(dimX * (1 - cropPercent));

  const yMin = Math.floor(dimY * cropPercent);
  const yMax = Math.floor(dimY * (1 - cropPercent));

  // Không crop theo trục Z
  const zMin = 0;
  const zMax = dimZ;

  // Lấy pixel buffer gốc
  const scalarData = imageData.getPointData().getScalars().getData();

  // Tạo buffer mới
  const newWidth = xMax - xMin;
  const newHeight = yMax - yMin;
  const newDepth = zMax - zMin;

  const newBuffer = new scalarData.constructor(
    newWidth * newHeight * newDepth
  );

  let index = 0;

  // Copy pixel từ buffer cũ vào buffer mới
  for (let z = zMin; z < zMax; z++) {
    for (let y = yMin; y < yMax; y++) {
      for (let x = xMin; x < xMax; x++) {
        const oldIdx = x + y * dimX + z * dimX * dimY;
        newBuffer[index++] = scalarData[oldIdx];
      }
    }
  }

  // Tạo volume mới
  const croppedVolumeId = volume.volumeId + "_cropped";

  const croppedVolume = await volumeLoader.createAndCacheDerivedVolume(
    volume.volumeId,
    {
      volumeId: croppedVolumeId,
      imageData: {
        dimensions: [newWidth, newHeight, newDepth],
        spacing,
        direction,
        origin: [
          origin[0] + xMin * spacing[0],
          origin[1] + yMin * spacing[1],
          origin[2],
        ],
        scalarData: newBuffer,
      },
    }
  );

  return croppedVolume;
}

export default cropImageVolume