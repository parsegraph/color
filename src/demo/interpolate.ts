import ColorForm from "./ColorForm";

document.addEventListener("DOMContentLoaded", () => {
  const b = document.getElementById("block");
  const slider = document.getElementById("interp") as HTMLInputElement;

  const interpVal = document.getElementById("interp-val");

  let val = 0.5;
  const refresh = () => {
    console.log("REFRESH");
    aForm.refresh();
    bForm.refresh();
    const start = aForm.asColor();
    const end = bForm.asColor();

    const c = start.interpolate(end, val);
    b.style.backgroundColor = c.asRGBA();
    slider.value = "" + val;
    interpVal.innerHTML = "" + val;
    const label = document.getElementById("dest-color");
    label.innerText = c.asRGBA();
    label.style.color = c.luminance() > 0.3 ? "black" : "white";
  };
  const aForm = new ColorForm(refresh);
  const bForm = new ColorForm(refresh);

  document.getElementById("first").appendChild(aForm.elem());
  document.getElementById("second").appendChild(bForm.elem());

  slider.addEventListener("change", () => {
    console.log(slider.value);
    val = parseFloat(slider.value);
    refresh();
  });
  refresh();
});
