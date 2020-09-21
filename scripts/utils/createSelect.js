import createDescription from './createDescription';

export default function createSelect(label, id, options, description, required) {
  const div = document.createElement('div');
  div.className = 'form-control';

  const labelEl = document.createElement('label');
  labelEl.innerText = label;
  labelEl.htmlFor = id;
  labelEl.className = required ? 'required' : '';
  div.append(labelEl);

  const select = document.createElement('select');
  select.id = id;
  select.required = required;
  select.name = id;

  [{ value: '', label: '' }, ...options].forEach(({ value, label }) => {
    const optionEl = document.createElement('option');
    optionEl.value = value;
    optionEl.innerText = label;
    select.append(optionEl);
  });

  if (description) {
    const span = createDescription(description, id);
    select.describedBy = span.id;
    div.append(span);
  }

  div.append(select);

  return div;
}
