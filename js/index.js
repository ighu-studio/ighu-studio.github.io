function file_get_contents( url ) {	// Reads entire file into a string
	// 
	// +   original by: Legaev Andrey
	// %		note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.

	var req = null;
	try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
		try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
			try { req = new XMLHttpRequest(); } catch(e) {}
		}
	}
	if (req == null) throw new Error('XMLHttpRequest not supported');

	req.open("GET", url, false);
	req.send(null);

	return req.responseText;
}

const { Tolgee, IcuFormatter } = window['@tolgee/core'];
const tg = Tolgee.use(IcuFormatter).init({
	defaultLanguage: 'eo',
	inputPrefix: '{{',
	inputSuffix: '}}',
	watch: false,
});

var loaded_posts = 4;
var posts = JSON.parse(file_get_contents("/posts/posts.json"));
var length = Object.keys(posts).length;
for(var i = length; i > Math.max(length - loaded_posts, 0); i--){
	$('.post-block').append(
	'<div class="container-md col-12 col-lg-6 col-sm-12">\
		<div class="post m-3 bg-light rounded p-4">'
		+
		marked.parse(file_get_contents("/posts/" + tg.lang + "/" + posts[i] + ".md"))
		+
		'</div>\
	</div>');
}

function montriplu() {
	for(var i = length - loaded_posts; i > Math.max(length - loaded_posts - 4, 0); i--){
		$('.post-block').append(
		'<div class="container-md col-12 col-lg-6 col-sm-12">\
			<div class="post m-3 bg-light rounded p-4">'
			+
			marked.parse(file_get_contents("/posts/" + tg.lang + "/" + posts[i] + ".md"))
			+
			'</div>\
		</div>');
	}
	loaded_posts += 4;
}

tg.run().then(() => {
	//$('.post').html();
	document.getElementsByTagName("html")[0].style.visibility = "visible";
});

tg.onLangChange.subscribe(() => {
	//$('.post').html(marked.parse(file_get_contents("/posts/" + tg.lang + "/20220819.md")));
});

$('.lang').click(function() {
	tg.lang = $(this).attr("value");
});
