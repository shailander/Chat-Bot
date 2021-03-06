import * as actionTypes from "./actionTypes";
import axios from "axios";

export const changeEditor = (payload) => ({
  type: actionTypes.CHANGE_CODE_EDITOR,
  payload,
});

export const sendUserRequest = (code, message) => {
  console.log(message, "axios message");
  return axios.post("https://shrouded-oasis-94153.herokuapp.com/", {
    code: `(${code})("${message}")`,
  });
};

export const changeCodeEditor = (payload) => ({
  type: actionTypes.CHANGE_CODE_EDITOR,
  payload,
});

export const setCode = (payload) => ({
  type: actionTypes.SET_CODE,
  payload,
});

export const setBotResponse = (payload) => ({
  type: actionTypes.SET_BOT_RESPONSE,
  payload,
});
export const sendMessage = (payload) => ({
  type: actionTypes.SEND_MESSAGE,
  payload,
});

export const sendUserMessage = (payload, code) => {
  return (dispatch) => {
    dispatch(sendMessage(payload));

    axios
      .post("https://shrouded-oasis-94153.herokuapp.com/", {
        code: `(${code})("${payload.userMessage}")`,
      })
      .then((res) => {
        dispatch(
          setBotResponse({
            key: payload.key,
            botMessage: res.data,
          })
        );
      });
  };
};
