import translations from './translations'

export default function customTranslate(template, replacements) {
  replacements = replacements || {}

  // Translate
  template = translations[template] || template

  // if (!translations[template]) {
  //   console.log(template)
  // }

  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}'
  })
}
