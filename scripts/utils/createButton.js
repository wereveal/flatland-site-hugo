export default function createButton(label) {
  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.className = 'btn btn--primary';
  button.innerText = label;
  button.id = 'submit-btn';
  return button;
}
