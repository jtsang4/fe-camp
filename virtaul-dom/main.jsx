/**
 * Generate virtual dom object - used by babel
 * @param type - node type
 * @param props - node props
 * @param children - childNodes
 * @returns {{type: *, props: *, children: *[]}} - VM node
 */
function h(type, props, ...children) {
  return {type, props, children}
}

/** @jsx: h */

// jsx element for test
const elem = (
  <ul className="list">
    <li>item 1</li>
    <li>item 2</li>
  </ul>
)

/**
 * Create real dom node by virtual dom node
 * @param node - VM node
 * @returns {Text|HTMLElement}
 */
function createRealDOM(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node)
  } else  {
    const element = document.createElement(node.type)
    const props = node.props || {}
    const children = node.children || []

    Object.keys(props).forEach(attr => {
      element.setAttribute(attr, node.props[attr])
    })
    children.map(createRealDOM).forEach(element.appendChild.bind(element))

    return element
  }
}

// Case 1: generate real dom by virtual dom
console.log(createRealDOM(elem))
