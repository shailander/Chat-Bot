import * as actionTypes from "./actionTypes";
const defaultCode = "function name (param) {return param;}";

const initialState = {
  chatList: [],
  code: defaultCode,
  codeEditorList: [
    {
      title: "main",
      content: defaultCode,
      key: "1",
    },
  ],
};

const Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SEND_MESSAGE:
      return {
        ...state,
        chatList: [...state.chatList, payload],
      };

    case actionTypes.SET_BOT_RESPONSE:
      const chatList = state.chatList.map((item) => {
        if (item.key === payload.key) {
          return { ...item, ...payload };
        }
        return item;
      });
      return {
        ...state,
        chatList,
      };
    case actionTypes.CHANGE_CODE_EDITOR:
      return {
        ...state,
        ...payload,
      };
    case actionTypes.SET_CODE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default Reducer;
