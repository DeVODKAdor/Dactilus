function PreProcessData(canvas, landmarkList) {
  const width = canvas.width;
  const height = canvas.height;

  let landmarkPoint = [];
  let landmarkX = 0,
    landmarkY = 0;

  for (let landmark of landmarkList) {
    landmarkX = Math.floor(Math.min(parseFloat(landmark.x) * width, width - 1));
    landmarkY = Math.floor(
      Math.min(parseFloat(landmark.y) * height, height - 1)
    );
    landmarkPoint.push([landmarkX, landmarkY]);
  }

  let tempLandmarkList = JSON.parse(JSON.stringify(landmarkPoint));
  let baseX = 0,
    baseY = 0;

  for (const [index, landmarkPoint] of tempLandmarkList.entries()) {
    if (index === 0) {
      baseX = landmarkPoint[0];
      baseY = landmarkPoint[1];
    }
    tempLandmarkList[index][0] = tempLandmarkList[index][0] - baseX;
    tempLandmarkList[index][1] = tempLandmarkList[index][1] - baseY;
  }

  tempLandmarkList = Object.values(tempLandmarkList).flat();

  let maxValue = tempLandmarkList.map(Math.abs);
  maxValue = Math.max(...tempLandmarkList)
  function normalize(n) {
    return n / maxValue;
  }

  tempLandmarkList = tempLandmarkList.map(normalize);
  return tempLandmarkList;
}

export default PreProcessData;
