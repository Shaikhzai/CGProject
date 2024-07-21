import { proxy } from "valtio";

//deafult values for shirt
const state= proxy({
    intro: true, //are we on homepage or not
    order: false,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
});

export default state;