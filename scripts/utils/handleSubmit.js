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

  setTimeout(() => {
    const form = document.getElementById(target.id);
    form.reset();
    Array.prototype.slice.call(form.children).forEach((el) => {
      el.style.display = 'none'
    });

    const div = document.createElement('div');
    div.id = `success-${target.id}`;

    const button = document.createElement('button');
    button.className = 'btn btn--primary';
    button.innerText = 'Reset form';

    const title = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerText = `We've sent it off! You should be hearing from us soon!`;
    title.append(strong);

    div.append(title);
    div.append(button);
    form.append(div);

    button.onclick = () => {
      Array.prototype.slice.call(form.children).forEach((el) => {
        el.style.display = '';
      });
      div.remove();
      btn.disabled = false;
      btn.innerText = 'Submit';
    };
  }, 300);
}
