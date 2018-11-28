import Vue from 'vue';

export const handlerResponse = (response) => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  })
};

export const setNotifyData = (title, message, type) => {
  return {
    group: 'foo',
    title,
    type,
    text: message
  };
};
