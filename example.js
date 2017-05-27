// @tip: run this example with:
// $ yarn example

import Vue from 'vue'
import hyperVue from './src'

const Counter = {
  props: ['start'],
  data() {
    return {
      count: this.start
    }
  },
  methods: {
    handleClick() {
      this.count++
    }
  },
  render(createElement) {
    const html = hyperVue(createElement);
    return html`
      <button style=${{backgroundColor: 'pink'}}
        id="foo"
        ref="foo"
        class="wow"
        nativeOnClick=${() => console.log('native')}
        onClick=${this.handleClick}
      >
        ${this.count}
      </button>
    `
  }
}

new Vue({
  el: '#app',
  render(h) {
    const html = hyperVue(h);
    return html`
      ${h(Counter, {props: {start: 0}})}
    `
  }
})
