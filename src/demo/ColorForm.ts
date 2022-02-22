import Color from "../index";
import ColorChannel from "./ColorChannel";

export default class ColorForm {
  _block: HTMLDivElement;
  _channels: ColorChannel[];
  _container: HTMLDivElement;

  constructor(onChange: () => void) {
    this._channels = "Red Green Blue Alpha".split(" ").map((col) => {
      return new ColorChannel(col, () => {
        this.refresh();
        onChange();
      });
    });

    this._block = document.createElement("div");
    this._block.className = "block";
    this._container = document.createElement("div");
    this._container.className = "color";
    this._container.appendChild(this._block);
    const form = document.createElement("form");
    this._container.appendChild(form);
    this._channels.forEach((channel) => {
      channel.elems().forEach((elem) => {
        form.appendChild(elem);
      });
    });

    const lum = document.createElement("label");
    lum.innerText = "Luminance:";
    this._lum = document.createElement("span");
    [lum, this._lum].forEach((elem) => form.appendChild(elem));

    const rgba = document.createElement("label");
    rgba.innerText = "RGBA:";
    this._rgba = document.createElement("span");
    [rgba, this._rgba].forEach((elem) => form.appendChild(elem));
  }

  _lum: HTMLSpanElement;
  _rgba: HTMLSpanElement;

  asColor() {
    return new Color(
      ...(this._channels.map((chan) => chan.value()) as [
        number,
        number,
        number,
        number
      ])
    );
  }

  refresh() {
    const c = this.asColor();
    this._block.style.backgroundColor = c.asRGBA();
    this._lum.innerText = "" + c.luminance();
    this._rgba.innerText = c.asRGBA();
  }

  elem() {
    return this._container;
  }
}
