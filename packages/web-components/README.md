# baks-components-web
A web component library built with vue 3/lit & tailwind 4.


## Why both Lit & Vue 3?
Although vue 3 can be used to build web components it has some shortcomings.
Especially with form elements that need to use the `attachInternals` api.
See [issue](https://github.com/vuejs/core/issues/10948#issuecomment-2877323232).


## Installation & Setup
```
npm install baks-components-web
```

Lets import the style, e.g in `app.css`

```css
@import 'tailwindcss';
@import 'baks-components-vue/themes/default.css';
@import 'baks-components-vue/style.css';
```

### Define Web Components
In order to get anything rendered we need to define the web component as tags.
```ts
import { register } from 'baks-components-web';
register(specificComponents: Components[] = []);
```
If not specified, `register` will define all html-tags.
Use `specificComponents` parameter to have full control over what tags are defined.

### TypeScript Support
The package provides global typings, therefore you need to opt-in by importing them. This is to prevent unexpected module augmentation.
*Vue* 
```ts
// Augments Vue `GlobalComponents` interface.
import 'baks-components-web/vue-types';
```

*JS/TS*
```ts
// Augments Global `HTMLElementTagNameMap` interface
import 'baks-components-web/html-types';
```
