/* eslint-disable import/prefer-default-export */

export const getCollections = (dispatch) => (configs) => {
  // eslint-disable-next-line no-undef
  fetch('/collections')
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'GET_COLLECTIONS',
        payload: object,
        metadata: { configs },
      });
    });
};

export const getCollectionByName = (dispatch) => (configs, collectionName) => {
  // eslint-disable-next-line no-undef
  fetch(`/collections/${collectionName}`)
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'GET_COLLECTION_BY_NAME',
        payload: object,
        metadata: { configs, collectionName },
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

export const createCollectionItem = (dispatch) => (collectionName, values, onSuccess) => {
  // eslint-disable-next-line no-undef
  fetch(`/collections/${collectionName}/`, {
    method: 'POST',
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'CREATE_COLLECTION_ITEM',
        payload: object,
        metadata: {
          collectionName,
        },
      });
      onSuccess();
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

export const editCustomView = (dispatch) => (id, values, onSuccess) => {
  // eslint-disable-next-line no-undef
  fetch(`/custom-views/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((object) => {
      dispatch({
        type: 'EDIT_CUSTOM_VIEW',
        payload: object,
        metadata: { id },
      });
      if (onSuccess) onSuccess();
    });
};
