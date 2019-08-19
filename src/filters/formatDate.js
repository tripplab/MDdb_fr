export default function formatDate (date) {
  if (date) {
    let dateSpaces = date.split(' ')
    if (dateSpaces.length == 2) {
      return dateSpaces[0].split('-').reverse().join('-')
    } else {
      return date
    }
  } else {
    return date
  }
}
