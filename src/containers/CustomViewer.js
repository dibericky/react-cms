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
  const { views, collections, configs } = state;
  return {
    custom: views.custom,
    collections,
    configs,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onItemChange: editCollectionItemById(dispatch),
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { name, category, onCategoryClick } = ownProps;
  const { onItemChange } = dispatchProps;
  const { custom, collections, configs } = stateProps;
  const customSelected = custom[name];
  if (!customSelected) {
    return {
      onItemChange: () => {},
      onCategoryClick: () => {},
    };
  }
  const collectionSelected = collections[customSelected.collection];
  if (!collectionSelected) {
    return {
      onItemChange: () => {},
      onCategoryClick: () => {},
    };
  }
  let categories = [];
  let collectionFiltered = Object.values(collectionSelected);

  if (customSelected.categorizedBy) {
    const collectionConfig = configs[customSelected.collection] || [];
    const columnForCategory = collectionConfig
      .find((column) => column.name === customSelected.categorizedBy);
    if (columnForCategory && columnForCategory.enum) {
      categories = columnForCategory.enum;
    }

    if (category) {
      collectionFiltered = collectionFiltered
        .filter((item) => item[customSelected.categorizedBy] === category);
    }
  }

  const data = projection(
    collectionFiltered,
    customSelected.projection,
    customSelected.metadata,
  );
  return {
    currentCategory: category,
    categories,
    data,
    type: customSelected.type,
    onItemChange: (id, values) => onItemChange(customSelected.collection, id, values),
    onCategoryClick: (categoryClicked) => onCategoryClick(categoryClicked),
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomViewerComponent);
