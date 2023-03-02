import {
  PDFDocument,
  PDFImage,
  PDFPage,
  StandardFonts,
  PDFFont,
} from "pdf-lib";
import type { ElementType } from "src/ElementType";

export async function templateToPDF(template: Template): Promise<Uint8Array> {
  const doc = await PDFDocument.create({});
  await Promise.all(
    template.artboards.map(async (artboard) => {
      const page = doc.addPage([artboard.width, artboard.height]);
      await Promise.all(
        template.elements.map((element) => {
          const modifiedElement = {
            ...element,
            y: artboard.height - element.y - element.height, // PDF Y = 0 at the bottom
          };
          return elementRenderer[element.type]({
            element: modifiedElement,
            page,
            doc,
          });
        })
      );
    })
  );
  const pdfBytes = await doc.save();
  return pdfBytes;
}

interface RenderBase {
  page: PDFPage;
  doc: PDFDocument;
}
interface RenderImageParams extends RenderBase {
  element: ImgDesignElement | TextDesignElement;
}
const elementRenderer: Record<
  ElementType,
  (params: RenderImageParams) => void
> = {
  img: async function renderImage({ page, element, doc }) {
    const imgElement = element as ImgDesignElement;
    let image: PDFImage;

    const { type, buffer } = await fetch(imgElement.src).then(async (r) => ({
      type: r.headers.get("Content-Type"),
      buffer: await r.arrayBuffer(),
    }));
    if (type === "image/jpeg") {
      image = await doc.embedJpg(buffer);
    }
    if (type === "image/png") {
      image = await doc.embedPng(buffer);
    }
    if (!image) return;
    page.drawImage(image, {
      x: imgElement.x,
      y: imgElement.y,
      width: imgElement.width,
      height: imgElement.height,
    });
  },
  text: function renderText({ page, element, doc }) {
    const textElement = element as TextDesignElement;
    const font = doc.embedStandardFont(StandardFonts.Helvetica);
    const fontSize = 16;
    const textLines = [];
    const lastLine = textElement.content.split("").reduce((line, char) => {
      const newLine = line + char;
      const textWidth = font.widthOfTextAtSize(newLine, fontSize);
      if (textWidth > textElement.width) {
        // text exceeds box so start with a new line
        textLines.push(newLine);
        return "";
      }
      return newLine;
    }, "");
    textLines.push(lastLine);

    textLines.forEach((line, index) => {
      const lineNr = index + 1;
      console.log("lineNr:", lineNr);
      page.drawText(line, {
        x: element.x,
        y: element.y + element.height - fontSize * lineNr,
        size: fontSize,
        font,
      });
    });
  },
};
