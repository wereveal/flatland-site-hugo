export default function createDescription(description, id) {
  const span = document.createElement('span');
  span.innerText = description;
  span.id = `${id}-helptext`;
  span.className = 'helptext';
  return span;
}
