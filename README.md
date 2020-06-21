# Custom element for declarative formatting of numbers.

See [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).

> `Intl.NumberFormatOptions#style` renamed as `type` attribute

> `UINumberElement#innerHTML` is used as a fallback if the value cannot be formatted.


```ts
// client.js
import UINumberElement from '@st-lib/ui-number-element'

window.customElements.define('ui-number', UINumberElement)
```

CDN links:
* `https://unpkg.com/@st-lib/ui-number-element/dist/index.js`
	```html
	<script crossorigin src="https://unpkg.com/@st-lib/ui-number-element/dist/index.js"></script>
	```
* `https://unpkg.com/@st-lib/ui-number-element/dist/index.min.js`
	```html
	<script crossorigin src="https://unpkg.com/@st-lib/ui-number-element/dist/index.min.js"></script>
	```

```html
<!-- default formatting -->
<ui-number value="123123.123456" maximumFractionDigits="6">
	123 123,123456
</ui-number>
<!-- currency support -->
<ui-number value="3449.64" type="currency" currency="usd">
	3 449,64 $
</ui-number>
<!-- percent support -->
<ui-number value=".27" type="percent">
	27%
</ui-number>
<!-- unit support, see browser compatibility -->
<ui-number value="367" type="unit" unit="day">
	367 days
</ui-number>
<!-- specify another language -->
<ui-number value="367" type="unit" unit="day" unitDisplay="long" lang="ru">
	367 дней
</ui-number>
<!-- invalid value is ignored -->
<ui-number value="the_****_is_lie">
	cake
</ui-number>
```
