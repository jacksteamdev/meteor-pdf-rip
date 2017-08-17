import getPagesFromPDF from './getPagesFromPDF'

export default async (url) => {
  if (!url) {
    console.warn('PDF URL not specified. Using default PDF.')
  }

  const pages = await getPagesFromPDF(url)

  return pages
}
