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
      return payload.reduce((acc, collectionName) => ({
        ...acc,
        [collectionName]: state[collectionName] || null,
      }), {});
    }
    case 'GET_COLLECTION_BY_NAME': {
      const { configs, collectionName } = metadata;
      const primaryKeyCollectionNameMap = getMapPrimaryKeyCollection(configs);
      return {
        ...state,
        [collectionName]: payload.reduce((acc, item) => {
          const primaryKeyColumn = primaryKeyCollectionNameMap[collectionName];
          return {
            ...acc,
            [item[primaryKeyColumn]]: item,
          };
        }, {}),
      };
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
