'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  lecturer: {
    type: String,
    default: '',
    trim: true
  },
  aboutLecturer: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  year: {
    type: String,
    default: '',
    trim: true
  },
  month: {
    type: String,
    default: '',
    trim: true
  },
  day: {
    type: String,
    default: '',
    trim: true
  },
  hour: {
    type: String,
    default: '',
    trim: true
  },
  minute: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Article', ArticleSchema);
