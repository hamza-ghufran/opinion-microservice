import type { User, MongooseSchemaDef } from 'local-types'

import mongoose from 'mongoose';

import { helpers } from '../util'

const def: MongooseSchemaDef<User> = {
  _id: { type: String, default: helpers.makeId() },
  email: {
    required: true,
    trim: true,
    type: String,
  },
  name: {
    maxlength: 100,
    required: true,
    trim: true,
    type: String,
  },
  password: {
    maxlength: 100,
    required: true,
    select: false,
    trim: true,
    type: String,
  },
  active: {
    required: true,
    type: Boolean,
  },
};

const schema = new mongoose.Schema(def, {
  timestamps: true,
});

schema.index({ email: 1 }, { unique: true, name: 'Email', background: true });

const Model = mongoose.model<User & mongoose.Document>('User', schema);

export { Model };
