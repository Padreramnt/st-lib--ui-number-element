import { createMethod } from '@st-lib/private'
enum attr {
	currency = 'currency',
	currencyDisplay = 'currencyDisplay',
	currencySign = 'currencySign',
	localeMatcher = 'localeMatcher',
	maximumFractionDigits = 'maximumFractionDigits',
	maximumSignificantDigits = 'maximumSignificantDigits',
	minimumFractionDigits = 'minimumFractionDigits',
	minimumIntegerDigits = 'minimumIntegerDigits',
	minimumSignificantDigits = 'minimumSignificantDigits',
	notation = 'notation',
	numberingSystem = 'numberingSystem',
	signDisplay = 'signDisplay',
	type = 'type',
	unit = 'unit',
	unitDisplay = 'unitDisplay',
	useGrouping = 'useGrouping',
	value = 'value',
}

const textId = 'text'
const fallbackId = 'fallback'

const styleContent = `
:host {
	display: inline;
}
#${textId} {
	display: contents;
}
#${textId}:not(:empty) + #${fallbackId} {
	display: none;
}`.trim()

function getLang(root: HTMLElement): string | string[] {
	if (root.lang) return root.lang
	if (root.parentElement) return getLang(root.parentElement)
	return window.navigator.languages as string[]
}
const currencyAttr = createAttr(attr.currency)
const currencyDisplayAttr = createEnumAttr(attr.currencyDisplay, ['code', 'name', 'narrowSymbol', 'symbol'] as const)
const currencySignAttr = createEnumAttr(attr.currencySign, ['accounting', 'standard'] as const)
const localeMatcherAttr = createEnumAttr(attr.localeMatcher, ['best fit', 'lookup'] as const)
const maximumFractionDigitsAttr = createNumberAttr(attr.maximumFractionDigits, { min: 1, max: 21, })
const maximumSignificantDigitsAttr = createNumberAttr(attr.maximumSignificantDigits, { min: 0, max: 20, })
const minimumFractionDigitsAttr = createNumberAttr(attr.minimumFractionDigits, { min: 0, max: 20, })
const minimumIntegerDigitsAttr = createNumberAttr(attr.minimumIntegerDigits, { min: 1, max: 21, })
const minimumSignificantDigitsAttr = createNumberAttr(attr.minimumSignificantDigits, { min: 1, max: 21, })
const notationAttr = createEnumAttr(attr.notation, ['compact', 'engineering', 'scientific', 'standard'] as const)
const numberingSystemAttr = createEnumAttr(attr.numberingSystem, ['arab', 'arabext', 'bali', 'beng', 'deva', 'fullwide', 'gujr', 'guru', 'hanidec', 'khmr', 'knda', 'laoo', 'latn', 'limb', 'mlym', 'mong', 'mymr', 'orya', 'tamldec', 'telu', 'thai', 'tibt'] as const)
const signDisplayAttr = createEnumAttr(attr.signDisplay, ['always', 'auto', 'exceptZero', 'never'] as const)
const typeAttr = createEnumAttr(attr.type, ['currency', 'decimal', 'percent', 'unit'] as const)
const unitAttr = createAttr(attr.unit)
const unitDisplayAttr = createEnumAttr(attr.unitDisplay, ['long', 'narrow', 'short'] as const)
const valueAttr = createNumberAttr(attr.value)

function toLowerCase(inp: string | String) {
	return inp.toLowerCase()
}

function createEnumAttr<T extends string>(name: string, values: readonly T[]): { get<F>(target: Element, fallback: F): T | F, set(target: Element, value: any): void } {
	const caseInsensitiveValues = values.map(toLowerCase)
	return {
		get<F>(target: Element, fallback: F): F | T {
			const value = target.getAttribute(name)
			if (null == value) return fallback
			const index = caseInsensitiveValues.indexOf(value.trim().toLowerCase())
			return ~index ? values[index] : fallback
		},
		set(target: Element, value: any) {
			if (typeof value === 'undefined') return
			if (null == value) target.removeAttribute(name)
			else target.setAttribute(name, value)
		}
	}
}
function createNumberAttr(name: string, options?: { min?: number, max?: number }) {
	return {
		get<F>(target: Element, fallback: F) {
			const value = target.getAttribute(name)
			if (null == value) return fallback
			let out = +value
			if (isNaN(out)) return fallback
			if (options) {
				const min = null == options.min ? null : +options.min
				const max = null == options.max ? null : +options.max
				if (null != min && !isNaN(min)) out = Math.max(out, min)
				if (null != max && !isNaN(max)) out = Math.min(out, max)
			}
			return out
		},
		set(target: Element, value: any) {
			if (typeof value === 'undefined') return
			if (null == value || isNaN(+value)) target.removeAttribute(name)
			else target.setAttribute(name, value)
		}
	}
}
function createAttr<T = string>(name: string, format?: (input: string) => T) {
	return {
		get<F>(target: Element, fallback: F) {
			const value = target.getAttribute(name)
			if (null == value) return fallback
			if (typeof format === 'function') return format(value)
			return value
		},
		set(target: Element, value: any) {
			if (typeof value === 'undefined') return
			if (null == value) target.removeAttribute(name)
			else target.setAttribute(name, value)
		}
	}
}

function getOptions(inp: Record<any, any>) {
	const o: Record<any, any> = {}
	// avoid property getter recalculation
	const {
		currency,
		currencyDisplay,
		currencySign,
		localeMatcher,
		maximumFractionDigits,
		maximumSignificantDigits,
		minimumFractionDigits,
		minimumIntegerDigits,
		minimumSignificantDigits,
		notation,
		numberingSystem,
		signDisplay,
		type,
		unit,
		unitDisplay,
	} = inp
	if (null != currency) o.currency = currency
	if (null != currencyDisplay) o.currencyDisplay = currencyDisplay
	if (null != currencySign) o.currencySign = currencySign
	if (null != localeMatcher) o.localeMatcher = localeMatcher
	if (null != maximumFractionDigits) o.maximumFractionDigits = maximumFractionDigits
	if (null != maximumSignificantDigits) o.maximumSignificantDigits = maximumSignificantDigits
	if (null != minimumFractionDigits) o.minimumFractionDigits = minimumFractionDigits
	if (null != minimumIntegerDigits) o.minimumIntegerDigits = minimumIntegerDigits
	if (null != minimumSignificantDigits) o.minimumSignificantDigits = minimumSignificantDigits
	if (null != notation) o.notation = notation
	if (null != numberingSystem) o.numberingSystem = numberingSystem
	if (null != signDisplay) o.signDisplay = signDisplay
	if (null != type) o.style = type
	if (null != unit) o.unit = unit
	if (null != unitDisplay) o.unitDisplay = unitDisplay
	return o
}

function validateOptions(options: Record<any, any>) {
	if ('currency' === options.style) {
		return typeof options.currency === 'string' && options.currency
	} else if ('unit' === options.style) {
		return typeof options.unit === 'string' && options.unit
	}
	return true
}

const observedAttributes = Object.values(attr).map(toLowerCase).concat('lang')
const numberFormattersMap: Record<string, Intl.NumberFormat> = {}

const [update, defineUpdate] = createMethod()

export class UINumberElement extends HTMLElement {
	static get observedAttributes() {
		return observedAttributes.slice()
	}

	constructor() {
		super()
		const shadow = this.attachShadow({ mode: 'closed' })
		const formatted = document.createElement('span')
		formatted.id = textId
		const fallback = document.createElement('slot')
		fallback.id = fallbackId
		const style = document.createElement('style')
		style.innerHTML = styleContent
		shadow.append(
			style,
			formatted,
			fallback,
		)
		const update = () => {
			try {
				const {
					value,
				} = this
				if (null == value || isNaN(value)) {
					if ('' !== formatted.textContent && null != formatted.textContent) formatted.textContent = null
					return
				}
				const options = getOptions(this)
				const locales = getLang(this)
				if (!validateOptions(options)) {
					if ('' !== formatted.textContent && null != formatted.textContent) formatted.textContent = null
					return
				}
				const optionsHashCode = JSON.stringify([locales, options])
				let textContent: string
				if (optionsHashCode in numberFormattersMap) {
					textContent = numberFormattersMap[optionsHashCode].format(value)
				} else {
					const numberFormat = new Intl.NumberFormat(locales, options)
					textContent = numberFormat.format(value)
					numberFormattersMap[optionsHashCode] = numberFormat
				}
				if (textContent !== formatted.textContent) formatted.textContent = textContent
			} catch (e) {
				console.error(e)
				if ('' !== formatted.textContent && null != formatted.textContent) formatted.textContent = null
			}
		}
		defineUpdate(this, update)
	}

	get currency() { return currencyAttr.get(this, null) }
	set currency(inp) { currencyAttr.set(this, inp) }
	/** */
	get currencyDisplay() { return currencyDisplayAttr.get(this, null) }
	set currencyDisplay(inp) { currencyDisplayAttr.set(this, inp) }
	/** */
	get currencySign() { return currencySignAttr.get(this, null) }
	set currencySign(inp) { currencySignAttr.set(this, inp) }
	/** */
	get localeMatcher() { return localeMatcherAttr.get(this, null) }
	set localeMatcher(inp) { localeMatcherAttr.set(this, inp) }
	/** */
	get maximumFractionDigits() { return maximumFractionDigitsAttr.get(this, null) }
	set maximumFractionDigits(inp) { maximumFractionDigitsAttr.set(this, inp) }
	/** */
	get maximumSignificantDigits() { return maximumSignificantDigitsAttr.get(this, null) }
	set maximumSignificantDigits(inp) { maximumSignificantDigitsAttr.set(this, inp) }
	/** */
	get minimumFractionDigits() { return minimumFractionDigitsAttr.get(this, null) }
	set minimumFractionDigits(inp) { minimumFractionDigitsAttr.set(this, inp) }
	/** */
	get minimumIntegerDigits() { return minimumIntegerDigitsAttr.get(this, null) }
	set minimumIntegerDigits(inp) { minimumIntegerDigitsAttr.set(this, inp) }
	/** */
	get minimumSignificantDigits() { return minimumSignificantDigitsAttr.get(this, null) }
	set minimumSignificantDigits(inp) { minimumSignificantDigitsAttr.set(this, inp) }
	/** */
	get notation() { return notationAttr.get(this, null) }
	set notation(inp) { notationAttr.set(this, inp) }
	/** */
	get numberingSystem() { return numberingSystemAttr.get(this, null) }
	set numberingSystem(inp) { numberingSystemAttr.set(this, inp) }
	/** */
	get signDisplay() { return signDisplayAttr.get(this, null) }
	set signDisplay(inp) { signDisplayAttr.set(this, inp) }
	/** */
	get type() { return typeAttr.get(this, null) }
	set type(inp) { typeAttr.set(this, inp) }
	/** */
	get unit() { return unitAttr.get(this, null) }
	set unit(inp) { unitAttr.set(this, inp) }
	/** */
	get unitDisplay() { return unitDisplayAttr.get(this, null) }
	set unitDisplay(inp) { unitDisplayAttr.set(this, inp) }
	/** */
	get value() { return valueAttr.get(this, null) }
	set value(inp) { valueAttr.set(this, inp) }
	/** */
	get useGrouping() {
		return 'no' !== this.getAttribute(attr.useGrouping)
	}
	set useGrouping(inp) {
		this.setAttribute(attr.useGrouping, inp ? '' : 'no')
	}

	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
		name = name.toLowerCase()
		if (observedAttributes.includes(name) && oldValue !== newValue) update(this)
	}

	connectedCallback() {
		update(this)
	}
}

export default UINumberElement
