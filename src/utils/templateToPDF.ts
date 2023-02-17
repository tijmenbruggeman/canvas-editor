import { PDFDocument, PDFImage, PDFPage } from "pdf-lib";
import type { ElementType } from "src/ElementType";

export async function templateToPDF(template: Template): Promise<Uint8Array> {
  const doc = await PDFDocument.create({});
  await Promise.all(
    template.artboards.map(async (artboard) => {
      const page = doc.addPage([artboard.width, artboard.height]);
      await Promise.all(
        template.elements.map((element) =>
          elementRenderer[element.type]({ element, page, doc })
        )
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
  element: ImgDesignElement;
}
const elementRenderer: Record<
  ElementType,
  (params: RenderImageParams) => void
> = {
  img: async function renderImage({ page, element, doc }) {
    let image: PDFImage;
    
    const { type, buffer } = await fetch(element.src).then(async (r) => ({
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
      x: element.x,
      y: element.y,
      width: element.width,
      height: element.height,
    });
  },
  text: function renderText({ page, element, doc }) {},
};
