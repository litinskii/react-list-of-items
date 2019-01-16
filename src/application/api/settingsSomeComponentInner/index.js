import { get, save } from "../../common/api";

const getSomeComponentInnerClicksCount = async () => {
  try {
    const { clicksCount } = await get("/api/settingsSomeComponentInner");
    return clicksCount;
  } catch (error) {
    console.error("Error while 'getSomeComponentInnerClicksCount'", error);
    return Promise.reject(error);
  }
};

const saveSomeComponentInnerClicksCount = async someComponentInnerClicksCount => {
  try {
    const { clicksCount } = await save("/api/settingsSomeComponentInner", { clicksCount: someComponentInnerClicksCount });
    return clicksCount;
  } catch (error) {
    console.error("Error while 'saveSomeComponentInnerClicksCount'", error);
    return Promise.reject(error);
  }
};

export { getSomeComponentInnerClicksCount, saveSomeComponentInnerClicksCount };
