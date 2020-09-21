export default function createHeader(title, content) {
  const div = document.createElement('div');
  div.className = 'section-header';

  const h2 = document.createElement('h2');
  h2.innerText = title;

  div.append(h2);

  if (content) {
    const textWrapper = document.createElement('div');
    textWrapper.className = 'header-content';
    content.split('\n').forEach((c) => {
      const span = document.createElement('span');
      span.innerText = c;
      textWrapper.append(span);
    });
    div.append(textWrapper);
  }

  return div;
}
