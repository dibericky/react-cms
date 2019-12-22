const initialState = {
  default: [],
  custom: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case 'GET_COLLECTIONS': {
      return {
        ...state,
        default: Object.keys(payload),
      };
    }
    case 'GET_CUSTOM_CATEGORIES': {
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
