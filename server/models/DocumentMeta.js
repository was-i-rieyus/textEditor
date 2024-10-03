const { Schema, model } = require("mongoose");

const DocumentMeta = new Schema({
  document_name: String,
  document_description: String,
  _id: String,
  data: Object,
});

module.exports = model("DocumentMeta", DocumentMeta);
