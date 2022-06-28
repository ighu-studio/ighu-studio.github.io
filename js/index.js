function typeWriter(txt, speed, i = 0) {
	if (i < txt.length) {
		$('.typewriter').append(txt.charAt(i));
		i++;
		setTimeout(typeWriter(txt, 50, i), speed);
	}
}

const { Tolgee, IcuFormatter } = window['@tolgee/core'];
const tg = Tolgee.use(IcuFormatter).init({
  //apiUrl: 'https://app.tolgee.io',
  //apiKey: ':P',

  defaultLanguage: 'eo',
  inputPrefix: '{{',
  inputSuffix: '}}',
  watch: false,
});

tg.run().then(() => {
	var txt = tg.instant("BELETRO", undefined, true);
	typeWriter(txt, 100);
});

$('.banner').load("template/banner.txt");
//$('head').load("template/head.html");
//$('header').load("template/header.html");
$('footer').load("template/footer.html");
$('document').ready(function(){
	$('header').ready(function(){
		$('header').ready(function(){
			document.getElementsByTagName("html")[0].style.visibility = "visible";
		});
	});
});
$('.lang').click(function() {
	tg.lang = $(this).attr("value");
});
