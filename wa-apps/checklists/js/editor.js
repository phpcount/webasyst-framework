/*
 * Script for list settings page.
 */
(function () {
  var isNewUI = function () { return 'whichUI' in window && window.whichUI === '2.0' }
	// Select color
	$('#colors a').click(function(e) {
		var self = $(this);
    if (isNewUI()) {
      $('#cl-core .c-list').attr('class', 'box rounded custom-p-20 c-list ' + self.attr('class'));
    } else {
      $('#cl-core .c-list').attr('class', 'block double-padded c-list ' + self.parent().attr('class'));
    }

		if($(e.target).is(':radio')) {
			return true;
		}
		self.children(':radio').attr('checked', true);
		return false;
	});

	// Select icon
	$('#icons li').click(function(e) {
		$(this).addClass('selected').siblings().removeClass('selected');
		$('#icon').val('http://');
		return false;
	});

	// Warn user when there's more than 255 symbols are in name or icon field
	var warn = function(input) {
		var msg = input.next('.max255');
		if (input.val().length > 255 && !msg.length) {
			input.after('<em class="hint max255">'+$.cl.loc.max+'</em>');
		} else if (input.val().length <= 255 && msg.length) {
			msg.remove();
		}
	}
	$('#name').keyup(function() {
		warn($(this));
	});
	$('#icon').keyup(function() {
		warn($(this));
	});
	$('#icon').blur(function() {
		warn($(this));
	});

	// Submit changes
	var submit = function() {
		// already submitting?
		if ($('#submit').attr('disabled')) {
			return false;
		}

		var name = $('#name').val();
		if (!name || !name.trim()) {
      if (isNewUI()) {
        validListEdit({
          name: {
            selector: '#name',
            error: {
              selector: '#name-error',
              message: $.cl.loc.empty_name
            }
          }
        });
      } else {
        alert($.cl.loc.empty_name);
      }

			return false;
		}

		var icon = $('#icon').val();

    if (isNewUI()) {
      icon = $('#icons li.selected a').attr('icon');
    } else {
      if (icon.length < 8 || icon.substr(0, 7) != 'http://') {
        if ($('#icons li.selected i').length > 0) {
          icon = $('#icons li.selected i').attr('class').replace('icon16 ', '');
        } else {
          icon = 'c-white';
        }
      }
    }

		$('#submit').attr('disabled', true).parent().append($('<i class="icon16 loading">'));

    var color_class = isNewUI()
      ? $('#colors :radio:checked').parent().attr('class')
      : $('#colors :radio:checked').parent().parent().attr('class');
		var data = {
			name: name,
			icon: icon,
      color_class
		};
		if ($.cl.list_id) {
			data.id = $.cl.list_id;
		}

		$.post('?module=json&action=listsave', data, function(r) {
			window.location.search = '?action=list&id='+r.data;
		}, 'json');
		return false;
	};

	// submit on button click and on enter key
	$('#submit').click('click', submit);
	$(document).keyup(function(e) {
		if (e.which && e.which == 13) { // enter
			submit();
			return false;
		}

		if (e.which && e.which == 27) { // escape
			if ($.cl.list_id) {
				window.location.search = '?action=list&id='+$.cl.list_id;
			}
			return false;
		}
	});

	// highlight `new list` in sidebar
	if (!$.cl.list_id) {
		$('#sidebar-new-list li').addClass('selected');
	}

	$('#name').focus();

  var validListEdit = function (fields) {
    for (fieldName in fields) {
      var field = fields[fieldName];
      $(field.selector).addClass('state-error');
      $(field.error.selector).text(field.error.message).removeClass('hidden');
    }
  }

  $('#name').change(function () {
    if (this.value && this.value.trim()) {
      $(this).removeClass('state-error');
      $('#name-error').text('').addClass('hidden');
    }
  })
})();
