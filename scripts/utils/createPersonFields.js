import createInput from './createInput';

export default function createPersonFields() {
  const personGridRow = document.createElement('div');
  personGridRow.className = 'person-row';
  personGridRow.append(createInput('First Name', 'firstName', false, '', true));
  personGridRow.append(createInput('Last Name', 'lastName', false, '', true));

  const div = document.createElement('div');
  div.className = 'pco-person-container';

  div.append(personGridRow);
  div.append(createInput('Email Address', 'email', false, '', true, 'email'));
  return div;
}
