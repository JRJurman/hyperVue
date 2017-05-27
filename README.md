# hyperVue

> Use tagged template string in Vue.js

## Original Project vs Fork

This project is a fork of egoist's
[vue-html](https://github.com/egoist/vue-html).
In egoist's vue-html, the key logic is bound to Vue (using `Vue.use(HTML)`).  
In this version, vue-html is a function which takes in createElement.

## Install

```bash
$ npm install --save hypervue
```

## Usage

```js
import Vue from 'vue'
import hyperVue from 'hypervue'

new Vue({
  el: '#app',
  data: {
    count: 0
  },
  methods: {
    handleClick() {
      this.count++
    }
  },
  render(createElement) {
    const html = hyperVue(createElement);
    return hyperVue`
      <button onClick=${this.handleClick}>${this.count}</button>
    `
  }
})
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT](https://egoist.mit-license.org/) © [EGOIST](https://github.com/egoist)
