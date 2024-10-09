const Document = require("./models/Document");
const DocumentMeta = require("./models/DocumentMeta");



// Helper function to check if a document ID already exists
async function findDocumentMeta(id) {
  if (id == null) return false; // Return false if ID is null
  const document = await DocumentMeta.findById(id);
  return document != null; // Return true if document exists
}

// Helper function to find or create a document
async function findOrCreateDocument(id) {
  if (id == null) return; // Return if ID is null

  const document = await Document.findById(id);
  if (document) return document; // Return existing document
  return await Document.create({ _id: id, data: defaultValue }); // Create new document if not found
}



module.exports= { findDocumentMeta, findOrCreateDocument };