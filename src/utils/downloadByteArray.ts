export function downloadByteArray(
  byteArray: Uint8Array,
  filename: string
): void {
  const blob = new Blob([byteArray], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  const fileName = filename;
  link.download = fileName;
  link.click();
}
