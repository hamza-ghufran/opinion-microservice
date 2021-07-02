import type { Account, MongooseSchemaDef } from 'local-types'

import mongoose from 'mongoose';

const def: MongooseSchemaDef<Account> = {
  _id: { type: String, required: true },
  user: {
    required: true,
    trim: true,
    type: String,
  },
  active: {
    required: true,
    type: Boolean,
  },
  no_of_comments: {
    trim: true,
    type: Number,
  },
  no_of_post: {
    trim: true,
    type: Number
  }
};

const schema = new mongoose.Schema(def, {
  timestamps: true,
});

schema.index({ _id: 1, user: 1 }, { unique: true, name: 'IdtoUserIndex', background: true });

const Model = mongoose.model<Account & mongoose.Document>('Account', schema);

export { Model };
