'use strict';


module.exports = class {
	constructor({width = 80, end = 100, values = ['#'], stream = process.stdout}) {
		this.width = width;
		this.end = end;
		this.values = values;
		this.stream = stream;
	}
	
	update(...values) {
		let last = this.end.toString();
		let cur = setStrLen(values[0].toString(), last.length, false);
		
		let width = this.width - getStr('', cur, last).length;
		
		let out = [];
		forEachRevesed(values, (value, index) => {
			let size = Math.floor(value / this.end * width);
			for (let i = 0; i < size; i++) {
				out[i] = this.values[index];
			}
		});
		
		this.stream.write('\r' + getStr(setStrLen(out.join(''), width), cur, last) + '\r');
	}
};


function forEachRevesed(array, callback, thisArg) {
	let index = array.length - 1;
	Array.from(array).reverse().forEach(currentValue => callback.call(thisArg, currentValue, index--, array));
}


function setStrLen(str, len, append = true, char = ' ') {
	let diff = Math.max(0, len - str.length);
	
	str = str.slice(0, len);
	
	let add = new Array(diff + 1).join(char);
	str = append ? str + add : add + str;
	
	return str;
}


function getStr(out, cur, last) {
	return `[${out}] ${cur} / ${last}`;
}