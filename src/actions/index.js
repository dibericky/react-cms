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

export const getCustomViews = (dispatch) => {
  // eslint-disable-next-line no-undef
  fetch('/custom-views')
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'GET_CUSTOM_VIEWS',
        payload: object,
      });
    });
};
export const createCustomView = (dispatch) => (values, onSuccess) => {
  // eslint-disable-next-line no-undef
  fetch('/custom-views', {
    method: 'POST',
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'CREATE_CUSTOM_VIEW',
        payload: object,
      });
      onSuccess();
    });
};
