const { Schema, model } = require("mongoose");

const DocumentMeta = new Schema({
  document_name: String,
  document_description: String,
  _id: String,
  preview_image: String,
});

module.exports = model("DocumentMeta", DocumentMeta);
