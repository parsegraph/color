import ColorForm from "./ColorForm";

document.addEventListener("DOMContentLoaded", ()=>{
  const b = document.getElementById("block");

  const refresh = ()=>{
    aForm.refresh();
    bForm.refresh();
    const start = aForm.asColor();
    const end = bForm.asColor();

    const c = start.premultiply(end);
    b.style.backgroundColor = c.asRGBA();
    const label = document.getElementById("dest-color");
    label.innerText = c.asRGBA();
    label.style.color = c.luminance() > .3 ? "black" : "white";
  };
  const aForm = new ColorForm(refresh);
  const bForm = new ColorForm(refresh);

  document.getElementById("first").appendChild(aForm.elem());
  document.getElementById("second").appendChild(bForm.elem());
  refresh();
});
