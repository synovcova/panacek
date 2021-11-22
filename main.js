// proměnné
let panacek, panacekX, panacekY, panacekSirka, panacekVyska;
let mince, mineX, minceY, minceSirka, minceVyska;
let score, pocetMinci;
let zvukMince, zvukFanfara;

// tato funkce se spustí při načtení stránky
function priNacteniStranky() {

	// do proměnných si uložím odkaz na objekty panáčka, mince, score a zvuky,
	panacek = document.querySelector('#panacek');
	mince = document.querySelector('#mince');
	score = document.querySelector('#score');
	zvukMince = document.querySelector('#zvukmince');
	zvukFanfara = document.querySelector('#zvukfanfara');

	// nastavím výchozí hodnotu pro score
	pocetMinci = 0;

	// zjistíme šířku a výšku panáčka
	panacekSirka = panacek.width;
	panacekVyska = panacek.height;
	// a umístím panáčka do středu okna
	panacekX = Math.round(window.innerWidth / 2 - panacekSirka / 2);
	panacekY = Math.round(window.innerHeight / 2 - panacekVyska / 2);
	// umístím panáčka na startovní pozici
	umistiPanacka();

	// zjistím šířku a výšku mince
	minceSirka = mince.width;
	minceVyska = mince.height;
	// a vygeneruji první minci na náhodné pozici
	novaMince();

}

// funkce, která umístí panáčka na jeho souřadnice
function umistiPanacka() {

	panacek.style.left = panacekX + 'px';
	panacek.style.top = panacekY + 'px';

}

// funkce pro nahodné vygenerování nové pozice mince
// a umístění mince na tyto souřadnice
function novaMince() {

	minceX = Math.round(Math.random() * (window.innerWidth - minceSirka));
	minceY = Math.round(Math.random() * (window.innerHeight - minceVyska));
	mince.style.left = minceX + 'px';
	mince.style.top = minceY + 'px';

}

// pohyb zmáčknutím klávesy
function priStiskuKlavesy(udalost) {

	// šipka vlevo
	if (udalost.key === 'ArrowLeft') {
		panacekX -= 10;
		if (panacekX < 0) {
			panacekX = 0;
		}
		panacek.src = 'obrazky/panacek-vlevo.png';
	}

	// šipka vpravo
	if (udalost.key === 'ArrowRight') {
		panacekX += 10;
		if (panacekX + panacekSirka > window.innerWidth) {
			panacekX = window.innerWidth - panacekSirka;
		}
		panacek.src = 'obrazky/panacek-vpravo.png';
	}

	// šipka nahoru
	if (udalost.key === 'ArrowUp') {
		panacekY -= 10;
		if (panacekY < 0) {
			panacekY = 0;
		}
		panacek.src = 'obrazky/panacek-nahoru.png';
	}

	// šipka dolů
	if (udalost.key === 'ArrowDown') {
		panacekY += 10;
		if (panacekY + panacekVyska > window.innerHeight) {
			panacekY = window.innerHeight - panacekVyska;
		}
		panacek.src = 'obrazky/panacek.png';
	}

	// panáčka umistím na nově vypočítanou pozici
	umistiPanacka();

	//  kolizi panáčka s mincí
	otestujKolizi();

}

// fuknce pro otestování kolize panáčka s mincí
function otestujKolizi() {

	// otestujeme, zda nedošlo ke kolizi s mincí
	if (!(panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
		// obdélníky se překrývají, mimozemšťan našel minci

		//  zvuk sebrání mince
		zvukMince.play();

		// zvýším skóre
		zvysScore();

		// posunu minci na novou náhodnou pozici
		novaMince();
	}
}

// funkce pro zvýšení skóre
function zvysScore() {

	// zvýším skóre o 1
	pocetMinci++;

	// vypíši skóre do textu na obrazovce
	score.innerText = pocetMinci;

	// otestuji, zda už hráč nemá 5 bodů
	if (pocetMinci === 5) {
		// přehraji fanfáru
		zvukFanfara.play();

		// zobrazím vítěznou hlášku
		alert('Vyhrála jsi tuhle super hru!');
	}

}