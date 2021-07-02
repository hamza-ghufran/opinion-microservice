import type { Post, MongooseSchemaDef } from 'local-types'

import mongoose from 'mongoose';

import { helpers } from '../util';

const def: MongooseSchemaDef<Post> = {
  _id: { type: String, default: helpers.makeId() },
  body: {
    trim: true,
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  active: {
    required: true,
    type: Boolean,
  },
  comments: [{
    body: String,
    author: String,
    date: { type: Date, default: Date.now }
  }]
}

const schema = new mongoose.Schema(def, {
  timestamps: true
})

schema.index({ _id: 1 }, { unique: true, name: 'IdToAutherIndex', background: true });

const Model = mongoose.model<Post & mongoose.Document>('Post', schema)

export { Model }