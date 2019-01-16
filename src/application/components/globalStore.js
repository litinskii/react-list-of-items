import { sum } from "lodash";
import Store from "../common/StoreClass";
import { getHomePageClicksCount } from "../api/settingsHomePage";
import { getSomeComponentInnerClicksCount } from "../api/settingsSomeComponentInner";

class GlobalStore extends Store {
  async loadAllClicksCount() {
    this.set({ clickCount: sum(await Promise.all([getHomePageClicksCount(), getSomeComponentInnerClicksCount()])) });
  }
}

export default new GlobalStore({ clickCount: 0 });
