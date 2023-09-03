import { FilterQuery, Schema, SchemaDefinition } from 'mongoose';
import { IBase, IBaseModel } from './base.interface';

export default class BaseSchema<T extends IBase, U extends IBaseModel<T>> extends Schema<T, U> {
  constructor(definition: SchemaDefinition, collectionName: string) {
    super(
      {
        ...definition,
        deleted: { type: Boolean, default: false },
      },
      {
        collection: collectionName,
        timestamps: true,
        statics: {
          async findAllActive(filter: FilterQuery<T> = {}) {
            return this.find({ ...filter, deleted: false });
          },
        },
        methods: {
          async softDelete() {
            this.deleted = true;
            return this.save();
          },
        },
      },
    );
  }
}
