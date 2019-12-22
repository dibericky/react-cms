/* eslint-disable import/prefer-default-export */

export const getCollections = (dispatch) => {
  // eslint-disable-next-line no-undef
  fetch('/collections')
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'GET_COLLECTIONS',
        payload: object,
      });
    });
};

export const getConfigs = (dispatch) => {
  // eslint-disable-next-line no-undef
  fetch('/configs')
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'GET_CONFIGS',
        payload: object,
      });
    });
};

export const editCollectionItemById = (dispatch) => (collectionName, id, values) => {
  // eslint-disable-next-line no-undef
  fetch(`/collections/${collectionName}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'EDIT_COLLECTION_ITEM',
        payload: object,
        metadata: {
          collectionName,
          id,
        },
      });
    });
};

export const getCustomCategories = (dispatch) => {
  // eslint-disable-next-line no-undef
  fetch('/custom-categories')
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'GET_CUSTOM_CATEGORIES',
        payload: object,
      });
    });
};
export const createCustomCategory = (dispatch) => (values, onSuccess) => {
  // eslint-disable-next-line no-undef
  fetch('/custom-categories', {
    method: 'POST',
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'CREATE_CUSTOM_CATEGORY',
        payload: object,
      });
      onSuccess();
    });
};
