import Store from "../../common/StoreClass";
import { getSomeComponentInnerClicksCount, saveSomeComponentInnerClicksCount } from "../../api/settingsSomeComponentInner";

class SomeComponentInnerStore extends Store {
  async loadClicksCount() {
    try {
      this.set("loading", true);
      this.set({ someComponentInnerClicksCount: await getSomeComponentInnerClicksCount() });
    } finally {
      this.set("loading", false);
    }
  }

  async incrementClicksCount() {
    const someComponentInnerClicksCount = this.get("someComponentInnerClicksCount") + 1;

    try {
      this.set("loading", true);
      await saveSomeComponentInnerClicksCount(someComponentInnerClicksCount);
      this.set({ someComponentInnerClicksCount });
    } finally {
      this.set("loading", false);
    }
  }
}

export default new SomeComponentInnerStore({ someComponentInnerClicksCount: 0, loading: true });
