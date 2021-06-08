import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Supermarket-MS'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
