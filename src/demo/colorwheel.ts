import Color from "../index";

document.addEventListener("DOMContentLoaded", () => {
  const wheel = document.createElement("canvas");
  const scale = 1;
  wheel.width = (2 * 360) / scale;
  wheel.height = 450 / scale;
  const ctx = wheel.getContext("2d");

  const lum = document.createElement("input");
  lum.type = "range";
  lum.min = "" + 0;
  lum.max = "" + 100;
  lum.step = "" + 1;
  lum.value = "" + 50;

  lum.addEventListener("change", () => {
    refresh();
  });

  const debug = document.createElement("span");

  const drawLine = (h: number) => {
    for (let c = 0; c < 450; c += scale) {
      const col = Color.fromLCH(lum.valueAsNumber, c, h % 360, 1.0);
      ctx.fillStyle = col.asRGB();
      ctx.fillRect(h / scale, c / scale, 1, 1);
    }
  };

  let timer: number = null;

  let total = 0;

  const loop = (initial: number) => {
    const d = new Date();
    for (let h = initial; h < 2 * 360; h += scale) {
      const diff = new Date().getTime() - d.getTime();
      if (diff > 10) {
        total += diff;
        timer = requestAnimationFrame(() => {
          loop(h);
        });
        return true;
      }
      drawLine(h);
    }
    const diff = new Date().getTime() - d.getTime();
    debug.innerText = "Drawn in " + (total + diff) + "ms";
    return false;
  };

  const refresh = () => {
    if (timer) {
      cancelAnimationFrame(timer);
    }
    total = 0;
    timer = requestAnimationFrame(() => {
      loop(0);
    });
  };

  document.getElementById("first").appendChild(lum);
  document.getElementById("first").appendChild(wheel);
  document.getElementById("first").appendChild(debug);
  refresh();
});
