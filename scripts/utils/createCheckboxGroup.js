import createDescription from './createDescription';

export default function createCheckboxGroup(label, id, options, description, required) {
  const div = document.createElement('div');
  div.className = 'form-control';

  const labelEl = document.createElement('label');
  labelEl.innerText = label;
  labelEl.htmlFor = id;
  labelEl.className = required ? 'required' : '';
  div.append(labelEl);

  if (description) {
    const span = createDescription(description, id);
    div.describedBy = span.id;
    div.append(span);
  }

  options.forEach(({ id: optionId, label: optionLabel }) => {
    const optionDiv = document.createElement('div');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = optionId;
    checkbox.name = optionId;
    checkbox.dataset.parentId = id;
    optionDiv.append(checkbox);

    const checkboxLabel = document.createElement('label');
    checkboxLabel.innerText = optionLabel;
    checkboxLabel.htmlFor = optionId;
    optionDiv.append(checkboxLabel);

    div.append(optionDiv);
  });

  return div;
}
