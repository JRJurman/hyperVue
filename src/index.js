import hyperx from 'hyperx'

export default function (Vue) {
  Vue.prototype.$html = function (...args) {
    const createElement = hyperx((tag, attrs, children) => {
      for (const key in attrs) {
        if (key.substring(0, 2) === 'on') {
          attrs.on = attrs.on || {}
          const newKey = lowerCaseFirstLetter(key.substring(2))
          attrs.on[newKey] = attrs[key]
        } else if (key === 'className') {
          attrs.class = attrs.className
        } else if (key.substring(0, 8) === 'nativeOn') {
          attrs.nativeOn = attrs.nativeOn || {}
          const newKey = lowerCaseFirstLetter(key.substring(8))
          attrs.nativeOn[newKey] = attrs[key]
        } else if (key.substring(0, 8) === 'domProps') {
          attrs.domProps = attrs.domProps || {}
          const newKey = lowerCaseFirstLetter(key.substring(8))
          attrs.domProps[newKey] = attrs[key]
        } else if (key === 'id') {
          attrs.attrs = attrs.attrs || {}
          attrs.attrs.id = attrs.id
        }
      }
      return this.$createElement(tag, attrs, children)
    })

    const tree = createElement(...args)
    return tree
  }
}

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.substring(1)
}
