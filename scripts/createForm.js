import createButton from './utils/createButton';
import handleSubmit from './utils/handleSubmit';
import createPersonFields from './utils/createPersonFields';
import addFields from './utils/addFields';

!async function() {
  const id = parseInt(document.getElementById('getter').dataset.formId.trim(), 10);
  const baseUrl = 'https://flatlandchurch.com';
  const { data, included } = await fetch(`${baseUrl}/.netlify/functions/forms?id=${id}`).then((d) => d.json());

  const form = document.getElementById('shortcode-form');
  form.id = id;
  form.append(createPersonFields());
  data.forEach(addFields(form, included));
  form.append(createButton('Submit'));
  form.addEventListener('submit', handleSubmit);
}();
