import html2canvas from "html2canvas";
import Quill from "quill";

export async function captureFirstPageAsImage(quill: Quill, docName?: string) {
  // Custom size in pixels
  const CUSTOM_WIDTH = 770; // Width in pixels
  const CUSTOM_HEIGHT = 990; // Height in pixels

  // Clone the Quill editor's content
  const editorContent = quill.root.innerHTML;
  const wrapper = document.getElementById("preview");
  if (!wrapper) return;

  wrapper.style.position = "absolute"; // Position off-screen
  wrapper.style.left = "-9999px"; // Move off-screen
  wrapper.style.width = `${CUSTOM_WIDTH}px`; // Set width
  wrapper.style.height = `${CUSTOM_HEIGHT}px`; // Set height
  wrapper.style.overflow = "hidden"; // Hide overflow

  // Optionally, copy the Quill editor's styles to the wrapper
  wrapper.style.fontFamily = "inherit"; // Inherit font styles (or use custom)
  wrapper.style.lineHeight = "inherit";
  wrapper.style.padding = "16px";

  wrapper.innerHTML = editorContent;
  document.body.appendChild(wrapper);

  // Use html2canvas to take a screenshot of the first page
  try {
    const canvas = await html2canvas(wrapper, {
      scale: 0.3,
      useCORS: true,
      width: CUSTOM_WIDTH,
      height: CUSTOM_HEIGHT,
    });
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${docName || "document"}.png`;
    link.click();
  } catch (error) {
    console.error("Error capturing the first page as an image:", error);
  } finally {
    // Clean up the off-screen wrapper
    document.body.removeChild(wrapper);
  }
}
