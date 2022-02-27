// mask.ts

import { AnnotatedPrediction } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import {
  Coord2D,
  Coords3D,
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util";
import { getEyeAngle, getAngle } from "./analyzePoints";

const facePoints = {
  leftEye: [
    263, 249, 390, 373, 374, 380, 381, 382, 263, 466, 388, 387, 386, 385, 384,
    398, 263,
  ],
  leftIris: [474, 475, 476, 477, 474],
  leftEyeBrow: [276, 283, 282, 295, 300, 293, 334, 296, 276],
  rightEye: [
    33, 7, 163, 144, 145, 153, 154, 155, 33, 246, 161, 160, 159, 158, 157, 173,
    33,
  ],
  rightIris: [469, 470, 471, 472, 469],
  rightEyeBrow: [46, 53, 52, 65, 70, 63, 105, 66, 46],
  lips: [
    61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 61, 185, 40, 39, 37, 0, 267,
    269, 270, 409, 78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 78, 191, 80, 81,
    82, 13, 312, 311, 310, 415, 61,
  ],
  faceOval: [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379,
    378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127,
    162, 21, 54, 103, 67, 109, 10,
  ],
};

const annotationKeys = [
  "silhouette",
  "lipsUpperOuter",
  "lipsLowerOuter",
  "lipsUpperInner",
  "lipsLowerInner",
  "rightEyeUpper0",
  "rightEyeLower0",
  "rightEyeUpper1",
  "rightEyeLower1",
  "rightEyeUpper2",
  "rightEyeLower2",
  "rightEyeLower3",
  "rightEyebrowUpper",
  "rightEyebrowLower",
  "rightEyeIris",
  "leftEyeUpper0",
  "leftEyeLower0",
  "leftEyeUpper1",
  "leftEyeLower1",
  "leftEyeUpper2",
  "leftEyeLower2",
  "leftEyeLower3",
  "leftEyebrowUpper",
  "leftEyebrowLower",
  "leftEyeIris",
  "midwayBetweenEyes",
  "noseTip",
  "noseBottom",
  "noseRightCorner",
  "noseLeftCorner",
  "rightCheek",
  "leftCheek",
];

const drawMask = (ctx, keypoints) => {
  Object.keys(facePoints).forEach((key) => {
    const points = facePoints[key];
    ctx.beginPath();
    if (key == "leftIris") {
      ctx.strokeStyle = "transparent";
      ctx.fillStyle = "white";
      const { leftIris, leftEye } = getEyeAngle({ scaledMesh: keypoints });
      console.log(`irisX: ${leftIris.angleX}`);
      ctx.fillRect(leftIris.x - 2.5, leftIris.y - 2.5, 5, 5);
    } else if (key == "rightIris") {
      ctx.strokeStyle = "transparent";
      ctx.fillStyle = "white";
      const { rightIris } = getEyeAngle({ scaledMesh: keypoints });
      ctx.fillRect(rightIris.x - 2.5, rightIris.y - 2.5, 5, 5);
    } else if (key == "faceOval") {
      const { rightEye, rightIris, leftEye, leftIris } = getEyeAngle({
        scaledMesh: keypoints,
      });
      ctx.strokeStyle = "white";
      const newPointRight = {};
      newPointRight.x = (rightIris.x - rightEye.x) * 10;
      newPointRight.y = (rightIris.y - rightEye.y) * 10;
      const newPointLeft = {};
      newPointLeft.x = (leftIris.x - leftEye.x) * 10;
      newPointLeft.y = (leftIris.y - leftEye.y) * 10;
      const newPoint = {
        x1: (rightEye.x + leftEye.x) / 2,
        y1: (rightEye.y + leftEye.y) / 2,
      };
      newPoint.x2 = newPoint.x1 + (newPointRight.x + newPointLeft.x) / 2;
      newPoint.y2 = newPoint.y1 + (newPointRight.y + newPointLeft.y) / 2;

      ctx.beginPath();
      ctx.moveTo(newPoint.x1, newPoint.y1);
      ctx.lineTo(newPoint.x2, newPoint.y2);
      ctx.closePath();
      ctx.stroke();

      const newPoint2 = {
        x1: (rightEye.x + leftEye.x) / 2,
        y1: (rightEye.y + leftEye.y) / 2 - (rightEye.x - leftEye.x) / 2,
      };

      ctx.strokeStyle = "white";
      const { xAngle, yAngle } = getAngle([{ scaledMesh: keypoints }]);

      newPoint2.x2 = newPoint2.x1 + xAngle;
      newPoint2.y2 = newPoint2.y1 - yAngle;
      ctx.beginPath();
      ctx.moveTo(newPoint2.x1, newPoint2.y1);
      ctx.lineTo(newPoint2.x2, newPoint2.y2);
      ctx.closePath();
      ctx.stroke();
    } else ctx.strokeStyle = "white";
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.beginPath();
    if (true) {
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(keypoints[points[i]][0], keypoints[points[i]][1]);
      }
      ctx.closePath();
    }
    ctx.stroke();
  });
};

export const draw = (predictions, ctx, width, height) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;
      const annotations = prediction.annotations;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "black";
      ctx.save();
      drawMask(ctx, keypoints);
      ctx.restore();
    });
  }
};