// 3469

$(document).ready(function () {
	const html = document.querySelector('html'),
		currLangDom = document.querySelector('.curr_lang'),
		langSwitcher = document.querySelector('.lang_switcher'),
		langListItem = [...document.querySelectorAll('.lang_list_item')],
		userLangBrowser = navigator.language || navigator.userLanguage,
		languageParts = userLangBrowser.split('-'),
		userLang = languageParts[0],
		country = html.getAttribute('data-country');

	const hidePreloader = () => {
		html.classList.remove('hide');
		setTimeout(function () {
			html.classList.add('hide');
		}, 1000);
	};

	hidePreloader();

	const listOfLang = [
		'en',
		'pl',
		'de',
		'ru',
		'fi',
		'pt',
		// 'cz',
		'es',
		'hu',
		'fr',
		'ph',
		'vn',
		'th',
		'jp',
		'dk',
		'no',
		'gr',
		'lt',
		'lv',
		'ee',
		'sk',
		'bg',
		'ro',
		'se',
	];

	const countryToLang = {
		pl: 'pl',
		de: 'de',
		ru: 'ru',
		fi: 'fi',
		pt: 'pt',
		// cs: 'cz',
		es: 'es',
		hu: 'hu',
		fr: 'fr',
		fil: 'ph',
		vi: 'vn',
		th: 'th',
		ja: 'jp',
		da: 'dk',
		nb: 'no',
		nn: 'no',
		no: 'no',
		el: 'gr',
		lt: 'lt',
		lv: 'lv',
		et: 'ee',
		sk: 'sk',
		bg: 'bg',
		ro: 'ro',
		se: 'se',
		sv: 'se',
		default: 'en',
	};

	const data = {
		en: {
			countWB: '1500 €', //
		},
		by: {
			countWB: '1500 $', //
		},
		am: {
			countWB: '1500 $', //
		},
		ge: {
			countWB: '1500 $', //
		},
		md: {
			countWB: '1500 $', //
		},
		mn: {
			countWB: '1500 $', //
		},
		tm: {
			countWB: '1500 $', //
		},
		kg: {
			countWB: '1500 $', //
		},
		tj: {
			countWB: '1500 $', //
		},
		nz: {
			countWB: '3000 NZD',
		},
		ck: {
			countWB: '3000 NZD',
		},
		nu: {
			countWB: '3000 NZD',
		},
		pn: {
			countWB: '3000 NZD',
		},
		tk: {
			countWB: '3000 NZD',
		},
		dk: {
			countWB: '12000 DKK',
		},
		fo: {
			countWB: '12000 DKK',
		},
		gl: {
			countWB: '12000 DKK',
		},
		in: {
			countWB: '150000 INR',
		},
		bt: {
			countWB: '150000 INR',
		},
		np: {
			countWB: '150000 INR',
		},
		ca: {
			countWB: '1500 CAD',
		},
		pm: {
			countWB: '1500 CAD',
		},
		no: {
			countWB: '15000 NOK',
		},
		sj: {
			countWB: '15000 NOK',
		},
		cl: {
			countWB: '1200000 CLP',
		},
		pl: {
			countWB: '6000 PLN', //
		},
		mx: {
			countWB: '30000 MXN',
		},
		co: {
			countWB: '6000000 COP',
		},
		ar: {
			countWB: '750000 ARS',
		},
		br: {
			countWB: '7500 BRL',
		},
		// cz: {
		// 	countWB: '40000 CZK',
		// },
		hu: {
			countWB: '600000 HUF',
		},
		jp: {
			countWB: '150000 JPY',
		},
		kz: {
			countWB: '600000 KZT',
		},
		pe: {
			countWB: '6000 PEN', //
		},
		ph: {
			countWB: '80000 PHP',
		},
		th: {
			countWB: '45000 THB',
		},
		vn: {
			countWB: '40000000 VND',
		},
		az: {
			countWB: '3000 AZN',
		},
		ch: {
			countWB: '1500 CHF',
		},
		li: {
			countWB: '1500 CHF',
		},
		bg: {
			countWB: '3000 BGN',
		},
		se: {
			countWB: '15000 SEK', //
		},
		ro: {
			countWB: '7500 RON', //
		},
		default: {
			countWB: '1500 €',
		},
	};

	const inputValue = data[country]
		? data[country].countWB
		: data.default.countWB;
	const result = processValue(inputValue);
	function processValue(inputValue) {
		const [numbers, currencyIndex] = inputValue.match(/\d+(\s+\d+)*|\D+/g);

		if (numbers && currencyIndex) {
			const numericValue = numbers.replace(/ /g, '');

			const result = {
				fullBonus: numericValue + currencyIndex,
				numericBonus: numericValue,
				bonusHalf: Math.round(numericValue / 2) + currencyIndex,
				bonusSmall: Math.round(numericValue / 10) + currencyIndex,
				bonusMedium: Math.round(numericValue / 5) + currencyIndex,
				isoBonus: currencyIndex,
				currencyIndex,
			};
			return result;
		}
		return [];
	}

	function changeBonusContent(bonusWrapper, bonus) {
		let formattedNumber;
		bonusWrapper.forEach(item => {
			if (result[bonus].length > 4) {
				formattedNumber = result[bonus].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
			} else {
				formattedNumber = result[bonus];
			}
			item.textContent = formattedNumber;
			item.setAttribute('data-text', formattedNumber);
		});
	}

	const fullBonus = [...document.querySelectorAll('.bonus-full')];
	const halfBonus = [...document.querySelectorAll('.bonus-half')];
	const isoBonus = [...document.querySelectorAll('.bonus-iso')];

	changeBonusContent(fullBonus, 'fullBonus');
	changeBonusContent(halfBonus, 'bonusHalf');
	changeBonusContent(isoBonus, 'isoBonus');

	let lang = countryToLang[userLang] || countryToLang.default;

	listOfLang.forEach(item => {
		html.classList.remove(item);
		html.classList.add(lang);
	});

	if (country) {
		Object.keys(data).forEach(item => {
			if (item === country) {
				html.classList.add(`curr_${country}`);
			}
		});
	}

	const changeLanguage = item => {
		hidePreloader();

		const lang = item.getAttribute('data-lang');

		listOfLang.forEach(item => {
			html.classList.contains(item) && html.classList.remove(item);
		});

		html.classList.add(lang);

		langListItem.forEach(item => {
			item.classList.remove('curr');
		});
		item.classList.add('curr');

		currLangDom.innerHTML = item.innerHTML;
	};

	langListItem.forEach(item => {
		item.classList.remove('curr');
		item.addEventListener('click', () => {
			changeLanguage(item);
		});
	});

	const currLangItem = langListItem.find(
		item => item.getAttribute('data-lang') === lang
	);

	if (currLangItem) {
		currLangItem.classList.add('curr');
		currLangDom.innerHTML = currLangItem.innerHTML;
	} else {
		currLangDom.innerHTML = `<span>${countryToLang.default}</span>`;
	}

	langSwitcher.addEventListener('click', () => {
		$('.lang_switcher_outer').toggleClass('act');
		$('.lang_list').toggleClass('act');
		$('.lang_switcher').toggleClass('act');
	});

	document.addEventListener('click', function (e) {
		if (!langSwitcher.contains(e.target) && !langSwitcher.contains(e.target)) {
			langSwitcher.classList.remove('act');
			$('.lang_list').removeClass('act');
			$('.lang_switcher_outer').removeClass('act');
		}
	});

	$('#year').text(new Date().getFullYear());

	document.addEventListener('dragstart', function (event) {
		event.preventDefault();
	});

	const $button = $('#wheel__btn'),
		$spinner = $('#wheel__spinner'),
		$popup = $('#popup'),
		$popupBtn = $('#popup__btn'),
		$popupWindow1 = $('#popup__window1'),
		$popupWindow2 = $('#popup__window2');

	$button.on('click', () => {
		$button.addClass('disabled');
		$spinner.addClass('wheel__spinner_animated_1');
		$spinner.removeClass('wheel__spinner_animated');
		setTimeout(function () {
			localStorage.spin_3469 = 'wheel1_3469';
			$popup.addClass('popup__show');
			$popupWindow1.addClass('popup__window_show');
		}, 4000);
	});

	$popupBtn.on('click', () => {
		$popup.removeClass('popup__show');
		$popupWindow1.removeClass('popup__window_show');
		switch (localStorage.spin_3469) {
			case 'wheel1_3469': {
				setTimeout(function () {
					$button.addClass('disabled');
					$spinner.removeClass('wheel__spinner_animated');
					$spinner.attr('style', 'transform: rotate(1080deg)');
					$spinner.addClass('wheel__spinner_animated_final');
				}, 300);
				setTimeout(function () {
					localStorage.spin_3469 = 'wheel2_3469';
					$popup.addClass('popup__show');
					$popupWindow2.addClass('popup__window_show');
				}, 4300);
				break;
			}
			default: {
				break;
			}
		}
	});

	switch (localStorage.spin_3469) {
		case 'wheel1_3469': {
			$button.addClass('disabled');
			$spinner.removeClass('wheel__spinner_animated');
			$spinner.attr('style', 'transform: rotate(1080deg)');
			$popup.addClass('popup__show');
			$popupWindow1.addClass('popup__window_show');
			$popupWindow2.removeClass('popup__window_show');
			break;
		}
		case 'wheel2_3469': {
			$button.addClass('disabled');
			$spinner.removeClass('wheel__spinner_animated');
			$spinner.removeClass('wheel__spinner_animated_2');
			$spinner.attr('style', 'transform: rotate(1805deg)');
			$popup.addClass('popup__show');
			$popupWindow1.removeClass('popup__window_show');
			$popupWindow2.addClass('popup__window_show');
			break;
		}
		default: {
			break;
		}
	}
});
