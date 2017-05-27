import hyperx from 'hyperx'

const lowerCaseFirstLetter = string => string.charAt(0).toLowerCase() + string.substring(1)

export default (createElement) => (...args) => {
  const hyperCreateElement = hyperx((tag, attrs, children) => {
    const newAttrs = {}
    const defaults = ['style', 'className', 'key', 'ref', 'refInFor', 'slot']
    for (const key of defaults) {
      if (key === 'className') {
        newAttrs.class = attrs.className
      } else {
        newAttrs[key] = attrs[key]
      }
    }

    for (const key in attrs) {
      if (key.substring(0, 2) === 'on') {
        // onClick => on: {click}
        newAttrs.on = newAttrs.on || {}
        const newKey = lowerCaseFirstLetter(key.substring(2))
        newAttrs.on[newKey] = attrs[key]
      } else if (key.substring(0, 8) === 'nativeOn') {
        // nativeOnClick => nativeOn: {click}
        newAttrs.nativeOn = newAttrs.nativeOn || {}
        const newKey = lowerCaseFirstLetter(key.substring(8))
        newAttrs.nativeOn[newKey] = attrs[key]
      } else if (key.substring(0, 8) === 'domProps') {
        // domPropsInnerHTML => domProps: {innerHTML}
        newAttrs.domProps = newAttrs.domProps || {}
        const newKey = lowerCaseFirstLetter(key.substring(8))
        newAttrs.domProps[newKey] = attrs[key]
      } else if (defaults.indexOf(key) === -1) {
        // all others attrs => {attrs: attr}
        newAttrs.attrs = newAttrs.attrs || {}
        newAttrs.attrs[key] = attrs[key]
      }
    }

    return createElement(tag, newAttrs, children)
  })

  const tree = hyperCreateElement(...args)
  return tree
}
