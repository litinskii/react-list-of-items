import { get, save } from "../../common/api";

const getHomePageClicksCount = async () => {
  try {
    const { clicksCount } = await get("/api/settingsHomePage");
    return clicksCount;
  } catch (error) {
    console.error("Error while 'getHomePageClicksCount'", error);
    return Promise.reject(error);
  }
};

const saveHomePageClicksCount = async homePageClicksCount => {
  try {
    const { clicksCount } = await save("/api/settingsHomePage", { clicksCount: homePageClicksCount });
    return clicksCount;
  } catch (error) {
    console.error("Error while 'saveHomePageClicksCount'", error);
    return Promise.reject(error);
  }
};

export { getHomePageClicksCount, saveHomePageClicksCount };
