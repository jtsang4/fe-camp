/**
 * Generate virtual dom object (used by babel).
 * @param type - node type
 * @param props - node props
 * @param children - childNodes
 * @returns {{type: *, props: *, children: *[]}} - VM node
 */
function h(type, props, ...children) {
  return {type, props, children}
}

window.onload = () => {
  /** @jsx h */

// jsx element for test
  const $elem = (
    <ul className="list">
      <li>item 1</li>
      <li>item 2</li>
    </ul>
  )

  /**
   * Create real dom node by virtual dom node.
   * @param node - VM node
   * @returns {Text|HTMLElement}
   */
  function createRealDOM(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node)
    } else  {
      const $element = document.createElement(node.type)
      const props = node.props || {}
      const children = node.children || []

      Object.keys(props).forEach(attr => {
        $element.setAttribute(attr, node.props[attr])
      })
      children.map(createRealDOM).forEach($element.appendChild.bind($element))

      return $element
    }
  }

// Case 1: generate real dom by virtual dom
  const $root = document.getElementById('root')
  $root.appendChild(createRealDOM($elem))

  /**
   * Update children for a specific parent node.
   * For specific parent node, there are several cases of updating, 1. add node; 2. delete node; 3. replace node; 4. diff children of child node.
   * @param {HTMLElement} $parent - parent element node
   * @param newNode - child node at next state
   * @param oldNode - child node at previous state
   * @param {Number} index - current child node's index
   */
  function updateRealDOM($parent, newNode, oldNode, index = 0) {
    // it's impossible that at arbitrary valid index, oldNode and newNode are both undefined. so if one is undefined, the other must be defined.
    if (!oldNode) {
      $parent.appendChild(createRealDOM(newNode))
    } else if (!newNode) {
      $parent.removeChild($parent.childNodes[index])
    } else if (nodeHasChanged(newNode, oldNode)) {
      $parent.replaceChild(createRealDOM(newNode), $parent.childNodes[index])
    } else if (newNode.type) { // only element node has children
      const newChildrenLength = newNode.children.length
      const oldChildrenLength = oldNode.children.length
      for (let i = 0; i < Number.max(newChildrenLength, oldChildrenLength); i++) {
        updateRealDOM($parent.childNodes[index], newNode.children[i], oldNode.children[i], i)
      }
    }
  }

  /**
   * Judge if a child node at arbitrary index is updated.
   * @param newNode
   * @param oldNode
   * @returns {boolean}
   */
  function nodeHasChanged(newNode, oldNode) {
    return (typeof newNode !== typeof oldNode) ||
      (typeof oldNode === 'string' && newNode !== oldNode) ||
      (newNode.type !== oldNode.type)
  }

// Case 2: update DOM
  let currentState = $elem
  const statePool = {
    state: [
      (
        <ul className="list">
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
        </ul>
      ),
      (
        <ul className="list">
          <li>item 2</li>
          <li>item 3</li>
        </ul>
      ),
      (
        <ul className="list">
          <li>item 2</li>
          <div>div item</div>
        </ul>
      ),
      (
        <ul className="list">
          <li>item 2</li>
          <div>
            <ul className="list">
              <li>item 4</li>
            </ul>
          </div>
        </ul>
      )
    ],
    currentIndex: 0
  }
  document.getElementById('btn').addEventListener('click', () => {
    const nextState = statePool.state[statePool.currentIndex % 4]
    updateRealDOM($root, nextState, currentState)
    currentState = nextState
    statePool.currentIndex++
  })
}