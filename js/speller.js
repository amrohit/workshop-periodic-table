export default {
	check,
	lookup,
};

var elements;

await loadPeriodicTable();


// ****************************

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json();
}

function check(inputWord) {
	// TODO: determine if `inputWord` can be spelled
	// with periodic table symbols; return array with
	// them if so (empty array otherwise)
	console.log(elements);
	if (inputWord.length > 0) {
		for (let element of elements) {
			let symbol = element.symbol.toLowerCase();
			// if input word is enough to be a symbol
			console.log('symbol.length <= inputWord.length', symbol.length <= inputWord.length);
			if (symbol.length <= inputWord.length) {
				// if input word starts with symbol (first one or two characters are the same as symbol)
				console.log('inputWord.slice(0, symbol.length).toLowerCase() == symbol',inputWord.slice(0, symbol.length).toLowerCase(), symbol);
				if (inputWord.slice(0, symbol.length).toLowerCase() == symbol.toLowerCase()) {
					// still need to check the rest of the word
					console.log('inputWord.length > symbol.length', inputWord.length , symbol.length);
					if (inputWord.length > symbol.length) {
						console.log('inputWord.slice(symbol.length)',symbol.length, inputWord.slice(symbol.length));
						let res = check(inputWord.slice(symbol.length));
						// if the rest of the word can be spelled
						console.log('res.length > 0', res.length, 0);
						if (res.length > 0) {
							console.log('[symbol, ...res]',symbol, res);
							return [symbol, ...res];
						}
						//  else {
						// 	console.log('[symbol]', symbol);
						// 	return [symbol];
						// }
					} else {
						console.log('[symbol]', symbol);
						return [symbol]
					}
				}
			}
		}
	}

	return [];
}

function lookup(elementSymbol) {
	// TODO: return the element entry based on specified
	// symbol (case-insensitive)
	// (e.g. {number: 79, symbol: "Au", name: "Gold"})
	console.log(elementSymbol);
	for (let element of elements) {
		if (element.symbol.toLowerCase() == elementSymbol.toLowerCase()) {
			return element;
		}
	}
	return {};
}
