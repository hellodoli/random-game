/**
 * Add a stylesheet rule to the document (it may be better practice
 * to dynamically change classes, so style information can be kept in
 * genuine stylesheets and avoid adding extra elements to the DOM).
 * Note that an array is needed for declarations and rules since ECMAScript does
 * not guarantee a predictable object iteration order, and since CSS is
 * order-dependent.
 * @param {Array} rules Accepts an array of JSON-encoded declarations
 * @example
addStylesheetRules([
  ['h2', // Also accepts a second argument as an array of arrays instead
    ['color', 'red'],
    ['background-color', 'green', true] // 'true' for !important rules
  ],
  ['.myClass',
    ['background-color', 'yellow']
  ]
]);
*/

export function addStylesheetRules(rules) {
  const styleEl = document.createElement('style')

  // Append <style> element to <head>
  document.head.appendChild(styleEl)

  // Grab style element's sheet
  const styleSheet = styleEl.sheet

  for (let i = 0; i < rules.length; i++) {
    let j = 1,
      rule = rules[i],
      selector = rule[0],
      propStr = ''
    // If the second argument of a rule is an array of arrays, correct our variables.
    if (Array.isArray(rule[1][0])) {
      rule = rule[1]
      j = 0
    }

    for (let pl = rule.length; j < pl; j++) {
      const prop = rule[j]
      propStr += `${prop[0]}: ${prop[1]}${prop[2] ? ' !important' : ''};\n`
    }

    // Insert CSS Rule
    styleSheet.insertRule(`${selector}{${propStr}}`, styleSheet.cssRules.length)
  }
}
