import sendForm from './sendForm';

export default async function handleSubmit(e) {
  e.preventDefault();
  const { target } = e;
  const body = {
    person: {},
    fields: [],
  };

  for (const field of target) {
    if (field.name) {
      if (['firstName', 'lastName', 'email'].includes(field.name)) {
        body.person[field.name] = field.value;
      } else {
        if (field.type === 'select-one') {
          const option = field.options[field.selectedIndex];
          if (option.value) {
            body.fields.push({
              id: field.id,
              value: option.value,
            });
          }
        } else if (field.type === 'checkbox') {
          if (field.checked) {
            body.fields.push({
              id: field.dataset.parentId,
              value: field.id,
            });
          }
        } else if (field.value) {
          body.fields.push({
            id: field.name,
            value: field.value,
          });
        }
      }
    }
  }

  try {
    await sendForm(target.id, body);
  } catch (e) {}

  const btn = target.querySelector('button');
  btn.innerText = 'Saved!';
  btn.disabled = true;
}
