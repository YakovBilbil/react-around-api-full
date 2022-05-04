const urlGenerator = (string) => {
  const restrictedCharacters = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const charactersReplacements = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const specialCharactersRegExp = new RegExp(restrictedCharacters.split('').join('|'), 'g');

  return `http://yandex.practicum.com/${string.toString().toLowerCase()
    .replace(/\s+/g, '-') // replace whitespace with -
    .replace(specialCharactersRegExp, c => charactersReplacements.charAt(restrictedCharacters.indexOf(c))) // replace special characters
    .replace(/&/g, '-and-') // replace & with "and"
    .replace(/[^\w\-]+/g, '') // remove non-words
    .replace(/\-\-+/g, '-') // replace multiple hyphens with a single one
    .replace(/^-+/, '') // remove - at the beginning of the line
    .replace(/-+$/, '') // remove - at the end of the line
  }`
};

module.exports = urlGenerator;