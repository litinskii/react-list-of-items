const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJSON = response => response.json();

const get = async url => {
  try {
    return await parseJSON(checkStatus(await fetch(url)));
  } catch (error) {
    console.error(`Error while "get(${url})"`, error);
    return Promise.reject(error);
  }
};

const save = async (url, params) => {
  try {
    return await parseJSON(
      checkStatus(
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(params)
        })
      )
    );
  } catch (error) {
    console.error(`Error while "save(${url})"`, error);
    return Promise.reject(error);
  }
};

export { get, save };
