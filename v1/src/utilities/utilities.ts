import html2canvas from "html2canvas";
import Quill from "quill";

export async function captureFirstPageAsImage(
  quill: Quill
): Promise<string | null> {
  // Custom size in pixels
  const CUSTOM_WIDTH = 816; // Width in pixels
  const CUSTOM_HEIGHT = 1056; // Height in pixels

  // Clone the Quill editor's content
  const editorContent = quill.root.innerHTML;
  const wrapper = document.createElement("div");
  wrapper.classList.add("prose");
  if (!wrapper) return null;

  {
    wrapper.style.position = "absolute"; // Position off-screen
    wrapper.style.left = "-9999px"; // Move off-screen
    wrapper.style.width = `${CUSTOM_WIDTH}px`; // Set width
    wrapper.style.height = `${CUSTOM_HEIGHT}px`; // Set height
    wrapper.style.overflow = "hidden"; // Hide overflow
    wrapper.style.fontFamily = "inherit"; // Inherit font styles (or use custom)
    wrapper.style.lineHeight = "inherit";
    wrapper.style.padding = "16px";
    wrapper.style.padding = "1in";
  }
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
    return dataUrl;
  } catch (error) {
    return null;
  } finally {
    // Clean up the off-screen wrapper
    try {
      document.body.removeChild(wrapper);
    } catch (err) {
      console.log(err);
    }
  }
}

export function initializeQuillShortCuts(quill: Quill) {
  const toggleFormat = (formatType: string, value: any, condition: any) => {
    const format = quill.getFormat();
    if (format[formatType] === condition) {
      quill.format(formatType, false);
    } else {
      quill.format(formatType, value);
    }
  };

  quill.keyboard.addBinding({ key: "1", altKey: true, shortKey: true }, () => {
    toggleFormat("header", 1, 1);
  });

  quill.keyboard.addBinding({ key: "2", altKey: true, shortKey: true }, () => {
    toggleFormat("header", 2, 2);
  });

  quill.keyboard.addBinding({ key: "3", altKey: true, shortKey: true }, () => {
    toggleFormat("header", 3, 3);
  });

  quill.keyboard.addBinding({ key: "4", altKey: true, shortKey: true }, () => {
    toggleFormat("color", "#0078d4", "#0078d4");
  });

  quill.keyboard.addBinding({ key: "5", altKey: true, shortKey: true }, () => {
    toggleFormat("color", "red", "red");
  });

  quill.keyboard.addBinding({ key: "6", altKey: true, shortKey: true }, () => {
    toggleFormat("color", "#ffffff", "#ffffff");
  });

  quill.keyboard.addBinding({ key: "7", altKey: true, shortKey: true }, () => {
    toggleFormat("background", "red", "red");
    toggleFormat("color", "#ffffff", "#ffffff");
  });

  quill.keyboard.addBinding({ key: "8", altKey: true, shortKey: true }, () => {
    toggleFormat("background", "yellow", "yellow");
  });

  quill.keyboard.addBinding({ key: "9", altKey: true, shortKey: true }, () => {
    toggleFormat("background", "green", "green");
    toggleFormat("color", "#ffffff", "#ffffff");
  });
}
