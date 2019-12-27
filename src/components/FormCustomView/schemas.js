export default {
  gallery: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
      },
      type: { type: 'string', enum: ['gallery'] },
      source: {
        type: 'string',
        enum: ['collection'],
      },
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
      categorizedBy: {
        type: 'string',
      },
    },
    additionalProperties: false,
    required: ['name', 'type', 'collection', 'projection'],
  },
};
