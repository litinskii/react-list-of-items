import mitt from "mitt";
import { cloneDeep, isObject, assign } from "lodash";

export default class Store {
  constructor(defaults = {}) {
    this.defaults = defaults;
    this.events = mitt();
    this.attributes = cloneDeep(defaults);
  }

  get(attribute) {
    return cloneDeep(this.attributes[attribute]);
  }

  set(attribute, value) {
    if (isObject(attribute)) {
      this.attributes = assign(this.attributes, attribute);
    } else {
      this.attributes[attribute] = value;
    }

    this.events.emit("change");
  }

  resetToDefaults() {
    this.attributes = cloneDeep(this.defaults);
    this.events.emit("change");
  }

  toJSON() {
    return cloneDeep(this.attributes);
  }
}
