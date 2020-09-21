import createDescription from './createDescription';

export default function createCheckbox(label, id, description, required) {
  const div = document.createElement('div');
  div.className = 'form-control';

  if (description) {
    const span = createDescription(description, id);
    div.describedBy = span.id;
    div.append(span);
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.name = id;
  div.append(checkbox);

  const labelEl = document.createElement('label');
  labelEl.innerText = label;
  labelEl.htmlFor = id;
  labelEl.className = required ? 'required' : '';
  div.append(labelEl);

  return div;
}
