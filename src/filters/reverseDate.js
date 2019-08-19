export default function reverseDate (date) {
  if (date) {
    return date.split('-').reverse().join('-')
  } else {
    return date
  }
}
