const initialState = {};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case 'GET_CONFIGS': {
      return payload;
    }
    default: {
      return state;
    }
  }
}
