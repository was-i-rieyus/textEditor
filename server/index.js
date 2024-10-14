//FOR LOCAL USAGE NOT FOR DEPLOYMENT


// Import required packages
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const HTMLtoDOCX = require("html-to-docx");

// Import utility functions
const { findOrCreateDocument, findDocumentMeta } = require("./util");

// Import MongoDB models
const Document = require("./models/Document");
const DocumentMeta = require("./models/DocumentMeta");

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/google-docs-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Set up Socket.IO for real-time collaboration
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON parsing for incoming requests

const defaultValue = ""; // Default content for new documents

// Socket.IO connection and event handling

io.on("connection", (socket) => {
    socket.on("get-document", async (documentId) => {
      const document = await findOrCreateDocument(documentId);
      socket.join(documentId);
      socket.emit("load-document", document.data);
  
      // Remove any previous listeners for these events
      socket.off("send-changes");
      socket.off("save-document");
  
      // Handle real-time changes
      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("receive-changes", delta);
      });
  
      // Save document changes
      socket.on("save-document", async (data) => {
        await Document.findByIdAndUpdate(documentId, { data });
      });
    });
  });
  

// API route to fetch document metadata
app.post("/document-meta", async (req, res) => {
  const { documentId } = req.body;
  try {
    const documents = await DocumentMeta.findById(documentId);
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

app.post("/update-doc-preview", async (req, res) => {
  const { documentId, dataURL } = req.body;
  try {
    await DocumentMeta.findByIdAndUpdate(documentId, {
      preview_image: dataURL,
    });
    res.status(200).json("Preview Image Updated");
  } catch (err) {
    res.status(500).json({ error: "Error updating preview image" });
  }
});

// API route to fetch all documents
app.get("/documents", async (req, res) => {
  try {
    const documents = await DocumentMeta.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

// API route to create a new document
app.post("/documents", async (req, res) => {
  const { docName, docId, docDesc, previewImg } = req.body;

  try {
    // Check if document ID already exists
    if (await findDocumentMeta(docId)) {
      res.status(409).json({ error: "Document Id already exists" });
      return;
    }

    // Create new document and its metadata
    const document = await Document.create({ _id: docId, data: defaultValue });
    const documentMeta = await DocumentMeta.create({
      _id: docId,
      document_name: docName,
      document_description: docDesc,
      preview_image: previewImg,
    });

    res.status(201).json("Document created successfully");
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong! Try again later." });
  }
});

// API route to generate DOCX from HTML content
app.post("/generate-docx", async (req, res) => {
  const { htmlContent, documentName } = req.body;

  // Validate HTML content
  if (!htmlContent) {
    return res.status(400).json({ error: "No HTML content provided." });
  }

  try {
    // Convert HTML to DOCX
    const fileBuffer = await HTMLtoDOCX(htmlContent, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });

    // Set response headers for file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${documentName || "document"}.docx"`
    );

    // Send the generated DOCX buffer
    res.send(fileBuffer);
  } catch (error) {
    console.error("Error generating DOCX:", error);
    res.status(500).json({ error: "Failed to generate Word document." });
  }
});

app.delete("/documents/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete document and its metadata
    await Document.findByIdAndDelete(id);
    await DocumentMeta.findByIdAndDelete(id);
    res.status(200).json("Document deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Error deleting document" });
  }
});

app.patch("/documents/:id", async (req, res) => {
  const { id } = req.params;
  const { document_name, document_description } = req.body;

  try {
    // Update document metadata
    await DocumentMeta.findByIdAndUpdate(id, {
      document_name: document_name,
      document_description: document_description,
    });
    res.status(200).json("Document updated successfully");
  } catch (error) {
    res.status(500).json({ error: "Error updating document" });
  }
});

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
