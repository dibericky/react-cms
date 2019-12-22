const initialState = {};

export default function (state = initialState, { type, payload, metadata }) {
  switch (type) {
    case 'GET_COLLECTIONS': {
      return Object.keys(payload).reduce((acc1, collectionName) => ({
        ...acc1,
        [collectionName]: payload[collectionName].reduce((acc2, item) => ({
          ...acc2,
          [item.id]: item,
        }), {}),
      }), {});
    }
    case 'EDIT_COLLECTION_ITEM': {
      const { id, collectionName } = metadata;
      return {
        ...state,
        [collectionName]: {
          ...state[collectionName],
          [id]: payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}
