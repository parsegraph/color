export default class ColorChannel {
  _label:HTMLLabelElement;
  _input:HTMLInputElement;
  _value:HTMLInputElement;
  _container:HTMLDivElement;

  constructor(name:string, onChange:()=>void) {
    this._label = document.createElement("label");
    this._label.innerHTML = name + ":";
    this._label.htmlFor = name + "-field";

    this._input = document.createElement("input");
    this._input.name = name;
    this._input.type = "range";

    this._value = document.createElement("input");
    this._value.value = this._input.value;
    this._value.addEventListener("change", ()=>{
      const val = this._value.valueAsNumber;
      if (isNaN(val)) {
        return;
      }
      this._input.value = "" + val;
      onChange();
    });

    this._container = document.createElement("div");
    this._container.appendChild(this._input);
    this._container.appendChild(this._value);

    this.setBounds(0, 1, 0.01, 0.5);

    this._input.addEventListener("change", ()=>{
      const val = this._input.valueAsNumber;
      if (isNaN(val)) {
        return;
      }
      this._value.value = "" + val;
      onChange();
    });
  }

  setBounds(min:number, max:number, step:number, val:number) {
    this._input.min = "" + min;
    this._input.max = "" + max;
    this._input.step = "" + step;
    this._input.value = "" + val;
    this._value.value = "" + val;
  }

  value() {
    return this._input.valueAsNumber;
  }

  elems() {
    return [this._label, this._container];
  }
}

