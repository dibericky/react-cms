const initialState = {
  default: [],
  custom: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case 'GET_COLLECTIONS': {
      return {
        ...state,
        default: payload,
      };
    }
    case 'GET_CUSTOM_VIEWS': {
      return {
        ...state,
        custom: payload,
      };
    }
    default: {
      return state;
    }
  }
}
