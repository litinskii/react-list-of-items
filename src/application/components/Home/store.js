import Store from "../../common/StoreClass";
import { getHomePageClicksCount, saveHomePageClicksCount } from "../../api/settingsHomePage";

class HomeStore extends Store {
  async loadHomePageClicksCount() {
    try {
      this.set("loading", true);
      this.set({ homePageClicksCount: await getHomePageClicksCount() });
    } finally {
      this.set("loading", false);
    }
  }

  async incrementHomePageClicksCount() {
    const homePageClicksCount = this.get("homePageClicksCount") + 1;

    try {
      this.set("loading", true);
      await saveHomePageClicksCount(homePageClicksCount);
      this.set({ homePageClicksCount });
    } finally {
      this.set("loading", false);
    }
  }
}

export default new HomeStore({ homePageClicksCount: 0, loading: true });
