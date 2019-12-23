import { connect } from 'react-redux';
import get from 'lodash.get';
import set from 'lodash.set';
import { cloneDeep } from 'lodash';

import { editCollectionItemById } from '../actions';
import CustomViewerComponent from '../components/CustomViewer';

function projection(data, columns, metadata = []) {
  const clonedData = cloneDeep(data);
  return clonedData.map((item) => ({
    id: item.id,
    metadata: metadata.reduce((acc, key) => {
      set(acc, key, get(item, key));
      return acc;
    }, {}),
    values: columns.reduce((acc, column) => {
      set(acc, column, get(item, column));
      return acc;
    }, {}),
  }));
}
function mapStateToProps(state) {
  const { views, collections } = state;
  return {
    custom: views.custom,
    collections,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onItemChange: editCollectionItemById(dispatch),
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { name } = ownProps;
  const { onItemChange } = dispatchProps;
  const { custom, collections } = stateProps;
  const customSelected = custom[name];
  if (!customSelected) {
    return {
      onItemChange: () => {},
    };
  }
  const collectionSelected = collections[customSelected.collection];
  if (!collectionSelected) {
    return {
      onItemChange: () => {},
    };
  }
  const data = projection(
    Object.values(collectionSelected),
    customSelected.projection,
    customSelected.metadata,
  );
  return {
    data,
    type: customSelected.type,
    onItemChange: (id, values) => onItemChange(customSelected.collection, id, values),
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomViewerComponent);
