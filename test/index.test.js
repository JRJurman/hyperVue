import Vue from 'vue'
import hyperVue from '../src'

test('main', () => {
  const vm = new Vue({
    render(creteElement) {
      const html = hyperVue(creteElement)
      return html`<div>hello</div>`
    }
  }).$mount()
  expect(vm.$el.textContent).toBe('hello')
})

test('transform vue-specific attributes', () => {
  const vm = new Vue({
    data: {count: 0},
    methods: {
      handleClick() {
        this.count++
      }
    },
    render(creteElement) {
      const html = hyperVue(creteElement)
      return html`
        <div onClick=${this.handleClick}>
          <span id="foo" class="hi" domPropsInnerHTML="hi"></span>
        </div>
      `
    }
  }).$mount()
  vm.$el.dispatchEvent(new Event('click'))
  vm._watcher.run()
  expect(vm.count).toBe(1)

  const hi = vm.$el.querySelector('.hi')
  expect(hi.textContent).toBe('hi')

  const foo = vm.$el.querySelector('#foo')
  expect(foo.textContent).toBe('hi')
})
