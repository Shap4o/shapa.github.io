document.addEventListener("DOMContentLoaded", function () {

	
	var c_form = document.querySelector('.product-list__form');
	document.querySelector('.product-list__add').addEventListener('click', function (e) {
		e.preventDefault();
		c_form.style.display = "block";
		setTimeout(function () {
			c_form.classList.add('active');
		}, 40)
	})
	document.getElementById('cancel').addEventListener('click', function (e) {
		e.preventDefault();
		c_form.classList.remove('active');
		setTimeout(function () {
			c_form.style.display = "none";
		}, 450)
	})
	c_form.addEventListener('click', function (e) {
		if (e.target === c_form) {
			c_form.classList.remove('active');
			setTimeout(function () {
				c_form.style.display = "none";
			}, 450)
		}
	})
	function notice() {
		var notice = document.querySelector('.notice')
		if (document.querySelector('.product-list__item')) {
			notice.style.visibility = "hidden";
		} else {
			notice.style.visibility = "visible";
		}
	}



	var i = 0;
	var obj = {
		"PP": PP,
		"PC": PC,
		"PN": PN,
		"URL": URL,
		"count": i
	}
	function save_session(URL, PN, PC, PP) {
		i++;
		obj.count = i;
		obj.PP = PP;
		obj.PC = PC;
		obj.PN = PN;
		obj.URL = URL;
		var sObj = JSON.stringify(obj);
		var nameItem = "sObj" + i
		localStorage.setItem(nameItem, sObj);

	}

	function insertItem(beforeElem, URL, PN, PC, PP) {
		beforeElem.insertAdjacentHTML('beforebegin', '<div class="product-list__item">' +
			'<a href="#" class="cross">X</a>' +
			'<div class="product-list__item-img">' +
			'<img src="' + URL + '" alt="" class="img-responsive">' +
			'</div>' +
			'<div class="product-list__item-content">' +
			'<div class="title">' + PN + '</div>' +
			'<div class="type">' + PC + '</div>' +
			'<div class="price">$<span>' + PP + '</span></div>' +
			'</div>' +
			'</div>');
	}

	function restore_session() {
		var plus = document.getElementById('add');
		var j = 1;
		while (true) {
			var obj = JSON.parse(localStorage.getItem('sObj' + j));
			if (!obj) break;

			console.log(obj);
			insertItem(plus, obj.URL, obj.PN, obj.PC, obj.PP);
			j++;
			i++;
		}

		delProd();
	}

	function update_Items() {
		localStorage.clear();
		i = 0
		var items = document.querySelectorAll('.product-list__item')
		items.forEach(function (item) {
			var PN = item.querySelector('.title').innerHTML;
			var PC = item.querySelector('.type').innerHTML;
			var PP = item.querySelector('.price span').innerHTML;
			var URL = item.querySelector('img').src;
			save_session(URL, PN, PC, PP);
		});
	}

	function itemAdd(URL, PN, PC, PP) {
		var plus = document.getElementById('add');
		insertItem(plus, URL, PN, PC, PP);
		save_session(URL, PN, PC, PP);
		notice();
	}

	function delProd() {
		var cross = document.querySelectorAll('.cross');
		cross.forEach(function (item) {
			item.addEventListener('click', function (e) {
				e.preventDefault();
				var prod = item.parentNode;
				prod.remove();

				update_Items();

				notice();
			});
		});
	}

	document.getElementById('ok').addEventListener('click', function (e) {
		e.preventDefault();
		var PN = document.getElementById('PN').value;
		var PC = document.getElementById('PC').value;
		var PP = parseFloat(document.getElementById('PP').value);
		var URL = document.getElementById('URL').value;
		itemAdd(URL, PN, PC, PP);
		delProd();
		c_form.classList.remove('active');
		setTimeout(function () {
			c_form.style.display = "none";
		}, 450)
	})

	delProd();
	restore_session();
	notice();

});
