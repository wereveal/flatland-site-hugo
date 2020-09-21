import createHeader from './createHeader';
import createInput from './createInput';
import createSelect from './createSelect';
import createCheckboxGroup from './createCheckboxGroup';
import createCheckbox from './createCheckbox';

export default function addFields(form, included) {
  return function ({ attributes, id }) {
    switch (attributes.field_type) {
      case 'heading': {
        const el = createHeader(attributes.label, attributes.description);
        form.append(el);
        break;
      }
      case 'text':
      case 'string': {
        const el = createInput(
          attributes.label,
          id,
          attributes.field_type === 'text',
          attributes.description,
          attributes.required,
        );
        form.append(el);
        break;
      }
      case 'dropdown': {
        const options = included.filter(
          ({ type, relationships }) =>
            type === 'FormFieldOption' && relationships.form_field.data.id === id,
        );
        const el = createSelect(
          attributes.label,
          id,
          options.map(({ attributes, id }) => ({ value: id, label: attributes.label })),
          attributes.description,
          attributes.required,
        );
        form.append(el);
        break;
      }
      case 'boolean': {
        console.log(attributes)
        const el = createCheckbox(
          attributes.label,
          id,
          attributes.description,
          attributes.required,
        );
        form.append(el);
        break;
      }
      case 'checkboxes':
      case 'workflow_checkboxes': {
        const options = included.filter(
          ({ type, relationships }) =>
            type === 'FormFieldOption' && relationships.form_field.data.id === id,
        );
        const el = createCheckboxGroup(
          attributes.label,
          id,
          options.map(({ id, attributes }) => ({ label: attributes.label, id })),
          attributes.description,
          attributes.required,
        );
        form.append(el);
        break;
      }
      default: {
        console.log(attributes);
      }
    }
  };
}
