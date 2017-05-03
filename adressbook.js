var editing = false;

$(document).ready(function(){

refresh();

$('#delete').click(function() {
	var key=editing;
	localStorage.removeItem(key);
	refresh();
});

// for(var i=0; i<localStorage.length; i++) {
// 	// console.log(localStorage.key(i));
// 	$('#contacts').append('<li>'+localStorage.key(i)+'</li>');
// }

$('button').on('click', function() {
	$('.form').show('.form');
	$('form')[0].reset();
});

$('.form').on('submit', function(event) {
	var name = $('#name').val();
	var scname= $('#scname').val();
	var tel = $('#tel').val();
	var email = $('#email').val();

	var contact = {
	name: name,
	scname: scname,
	tel: tel,
	email: email
};

	// kad forma nebutu submitinta, negautume naujo puslapio
	event.preventDefault(); 
	// $('#name').val();

	$('#contacts').append('<li>'+contact.name+'</li>');

	// nunulina laukus
	$('form')[0].reset();	

	var id = Date.now();
	if(editing) {
		id=editing;
	}

	localStorage.setItem(id, JSON.stringify(contact));
	editing=false;
	refresh();

	// delete localStorage[] isvalo;

	// $('#name').val('vardas'); rasys zodi 'vardas
});

// $('form').html('');
});

	function refresh() {
 	// isvalo, jei nieko neirasom  - isves viska
 	$('#contacts').html('');
 	for (var key in localStorage) 	{
 		if (key !== 'undefined') {
 			var item = JSON.parse(localStorage.getItem(key));
 			$('#contacts').append('<li data-id="' +key+ '">'+item.name+'</li>');
 		}
 	}
 	rebind();
 }

 	function rebind() {
	 	$('li').on('click', function(event) {
		var name =	$(this).data('id');
		var contact = localStorage.getItem(name);
		contact = JSON.parse(contact);

		editing = name;
		
		$('#name').val(contact.name);
		$('#scname').val(contact.scname);
		$('#tel').val(contact.tel);
		$('#email').val(contact.email);
		$('form').show();
	});
}

