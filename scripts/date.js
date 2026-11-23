const yearElement = document.querySelector('#current-year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const modifiedElement = document.querySelector('#lastModified');
if (modifiedElement) modifiedElement.textContent = `Last modified: ${document.lastModified}`;
