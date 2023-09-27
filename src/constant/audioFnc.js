import winSound from "../assets/audio/winSound.mp3";

export const audioFnc = {
  win: () => new Audio(winSound).play(),
};
