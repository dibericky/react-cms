export default {
  gallery: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
      },
      type: { type: 'string', enum: ['gallery'] },
      collection: { type: 'string' },
      projection: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
      },
      metadata: {
        type: 'array',
        items: { type: 'string' },
        minItems: 0,
      },
    },
    additionalProperties: false,
    required: ['name', 'type', 'collection', 'projection'],
  },
};
