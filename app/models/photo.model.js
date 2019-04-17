const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  data: String,
  name: String,
  contentType: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Photo', PhotoSchema);
