import ColorChannel from "./ColorChannel";
import Color from "../index";

class LCHForm {
  _container: HTMLDivElement;
  _rgba: HTMLSpanElement;
  _block: HTMLDivElement;

  _channels: ColorChannel[];

  constructor(onChange: () => void) {
    this._channels = "Luminance Chroma Hue Alpha".split(" ").map((col) => {
      return new ColorChannel(col, () => {
        this.refresh();
        onChange();
      });
    });
    this._channels[0].setBounds(0, 100, 1, 100);
    this._channels[1].setBounds(0, 720, 1, 255);
    this._channels[2].setBounds(0, 360, 1, 180);

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

    const rgba = document.createElement("label");
    rgba.innerText = "RGBA:";
    this._rgba = document.createElement("span");
    [rgba, this._rgba].forEach((elem) => form.appendChild(elem));
  }

  asColor() {
    return Color.fromLCH(
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
    this._rgba.innerText = c.asRGBA();
  }

  elem() {
    return this._container;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const refresh = () => {
    aForm.refresh();
    console.log(aForm.asColor());
  };
  const aForm = new LCHForm(refresh);

  document.getElementById("first").appendChild(aForm.elem());
  refresh();
});
