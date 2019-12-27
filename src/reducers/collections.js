/* eslint-disable prefer-destructuring */
const initialState = {};

function getMapPrimaryKeyCollection(configs) {
  return Object.keys(configs).reduce((acc, collectionName) => {
    let primaryKeyColumn = configs[collectionName].find((column) => column.primaryKey);
    if (!primaryKeyColumn) {
      primaryKeyColumn = configs[collectionName][0];
    }
    return {
      ...acc,
      [collectionName]: primaryKeyColumn.name,
    };
  }, {});
}
export default function (state = initialState, { type, payload, metadata }) {
  switch (type) {
    case 'GET_COLLECTIONS': {
      const { configs } = metadata;
      const primaryKeyCollectionNameMap = getMapPrimaryKeyCollection(configs);
      return Object.keys(payload).reduce((acc1, collectionName) => ({
        ...acc1,
        [collectionName]: payload[collectionName].reduce((acc2, item) => {
          const primaryKeyColumn = primaryKeyCollectionNameMap[collectionName];
          return {
            ...acc2,
            [item[primaryKeyColumn]]: item,
          };
        }, {}),
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
