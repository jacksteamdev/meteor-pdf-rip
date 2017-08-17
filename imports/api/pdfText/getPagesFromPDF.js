import { Meteor } from 'meteor/meteor'
import { PDFJS } from 'pdfjs-dist'

PDFJS.workerSrc = Meteor.absoluteUrl('js/pdf.worker.min.js')
const PDF_URL = Meteor.absoluteUrl('samples/ifm-sample.pdf')

export default async (url = PDF_URL) => {
  const pdf = await PDFJS.getDocument(url)
  const { numPages } = pdf.pdfInfo
  const pages = []

  // Get text content from each page
  for (let p = 0; pages.length < numPages; p++) {
    const pageNum = p + 1
    const page = await pdf.getPage(pageNum)

    const { items } = await page.getTextContent()
    const [, , pageWidth, pageHeight] = page.pageInfo.view

    const pageInfo = {pageNum, pageHeight, pageWidth}

    const lineNumbers = [...items.reduce((set, item) => {
      return set.add(item.transform[5])
    }, new Set())].sort((a, b) => b - a).map(n => [n, []])

    // lines map: {text, height, width, x, y, pageInfo, transform}
    // TODO: add font prop
    const lines = items.reduce((lines, item) => {
      const { fontName, str, height, width, transform } = item
      const [scale1, rotate1, rotate2, scale2, x, y] = transform
      const segment = {
        pageInfo,
        text: str,
        font: fontName,
        transform: {
          rotate: [ rotate1, rotate2 ],
          scale: [ scale1, scale2 ],
          height,
          width,
          x,
          y
        }
      }

      // Process pages into lines
      const line = lines.get(y)
      return lines.set(y, [...line, segment])
    }, new Map(lineNumbers))

    pages.push(Array.from(lines).map(l => l[1]))
  }

  // debugger
  return pages
}
