const initialState = {};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case 'GET_CONFIGS': {
      return Object.keys(payload).reduce((acc, configName) => ({
        ...acc,
        [configName]: payload[configName].map((column) => ({
          ...column,
          type: column.enum ? 'enum' : column.type,
          editable: !column.primaryKey,
        })),
      }), {});
    }
    default: {
      return state;
    }
  }
}
