export const PICTON_BLUE = {
  hex: '#24a4f0',
  rgbArray: [36, 164, 240],
};

export const YELLOW_ORANGE = {
  hex: '#FFA346',
  rgbArray: [255, 163, 70],
};

export const BLUE_COLORS = [
  [6, 143, 232], //rgb(6, 143, 232)
  [74, 155, 235], //rgb(74, 155, 235)
  [106, 166, 238], //rgb(106, 166, 238)
  [132, 178, 240], //rgb(132, 178, 240)
  [155, 191, 243], //rgb(155, 191, 243)
  [176, 203, 246], //rgb(176, 203, 246)
  [197, 216, 248], //rgb(197, 216, 248)
  [217, 229, 251], //rgb(217, 229, 251)
  [236, 242, 253], //rgb(236, 242, 253)
  [255, 255, 255], //rgb(255, 255, 255)
];

export const ORANGE_COLORS = [
  [255, 163, 70], //rgb(255, 163, 70)
  [255, 186, 117], //rgb(255, 186, 117)
  [255, 208, 163], // rgb(255, 208, 163)
  [255, 232, 208], // rgb(255, 232, 208)
  [255, 255, 255], // rgb(255, 255, 255)
];

export const rgbToHex = (rgbColorArray) =>
  `#${rgbColorArray[0].toString(16).padStart(2, '0')}${rgbColorArray[1]
    .toString(16)
    .padStart(2, '0')}${rgbColorArray[2].toString(16).padStart(2, '0')}`;
