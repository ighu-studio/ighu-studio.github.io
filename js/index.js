var txt = "";
var rewrite = true;
var speed = 200;
var i = 0;

function typeWriter() {
	if (i < txt.length && rewrite == true) {
		$('.typewriter').append(txt.charAt(i));
		i++;
		setTimeout(typeWriter, speed);
	} else {
		//$('.typewriter').html(tg.translate("MUZIKO", undefined, true).then(translation => {}));
	}
}

const { Tolgee, IcuFormatter } = window['@tolgee/core'];
const tg = Tolgee.use(IcuFormatter).init({
  //apiUrl: 'https://app.tolgee.io',
  //apiKey: ':P',

  defaultLanguage: 'ru',
  inputPrefix: '{{',
  inputSuffix: '}}',
  watch: false,
});

tg.run().then(() => {
	document.getElementsByTagName("html")[0].style.visibility = "visible";
	txt = tg.instant("_IGHU", undefined, true);
	typeWriter();
});

tg.onLangLoaded.subscribe(() => {
	if(i > 0){
		rewrite = false;
		$('.typewriter').html(tg.instant("_IGHU", undefined, true));
	}
});

$('.banner').load("template/banner.txt");
$('.lang').click(function() {
	tg.lang = $(this).attr("value");
});
