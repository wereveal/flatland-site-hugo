import createDescription from './createDescription';

export default function createInput(label, id, textarea, description, required, type = 'text') {
  const div = document.createElement('div');
  div.className = 'form-control';

  const labelEl = document.createElement('label');
  labelEl.innerText = label;
  labelEl.htmlFor = id;
  labelEl.className = required ? 'required' : '';
  div.append(labelEl);

  const input = document.createElement(textarea ? 'textarea' : 'input');
  input.id = id;
  input.required = required;
  input.name = id;
  if (!textarea) {
    input.type = type;
  }
  div.append(input);

  if (description) {
    const span = createDescription(description, id);
    input.describedBy = span.id;
    div.append(span);
  }

  return div;
}
