# Custom element for declarative formatting of numbers.

See [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).

> Intl.NumberFormatOptions#style renamed as `type` attribute

> UINumberElement#innerHTML is used as a fallback if the value cannot be formatted.

```ts
// client.js
import UINumberElement from '@st-lib/ui-number-element'

window.customElements.define('ui-number', UINumberElement)
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
<!-- unit support -->
<ui-number value="367" type="unit" unit="day">
	367 days
</ui-number>
<!-- percent support -->
<ui-number value=".27" type="percent">
	27%
</ui-number>
<!-- pass different lang -->
<ui-number value=".27" type="percent" lang="ru">
	27%
</ui-number>
<!-- invalid values ignored -->
<ui-number value="the_******_is_lie">
	this will be showed
</ui-number>
```
