$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	// Append table with add row form on add new button click
	//==============================Candidate===================================//
    $(".add-new-candidate").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("#p  table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="name" id="name"></td>' +
            '<td><input type="text" class="form-control" name="department" id="department"></td>' +
            // '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
//====================================Voter===================================//
		$(".add-new-voter").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="IDnumber" id="IDnumber"></td>' +
            '<td><input type="text" class="form-control" name="department" id="department"></td>' +
            // '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });

	// Add row on add button click
	$(document).on("click", ".add", function(){
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			input.each(function(){
				$(this).parent("td").html($(this).val());
			});
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new-candidate, .add-new-voter").removeAttr("disabled");
			$(".add-new-candidate").on('click',function(){
				$.get("http://localhost:3000/insertCandidate");
			});

			$(".add-new-voter").on('click',function(){
				$.get("http://localhost:3000/insertVoter");
			});
		}
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new-candidate, .add-new-voter").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new-candidate .add-new-voter").removeAttr("disabled");
    });

		$("#party-btn").on("click", function() {
	  $(this).html($(this).html() == 'View' ? 'Hide' : 'View');
		var x = document.getElementById("party-table");
		var voterbtn = document.getElementById("voter-btn");
	  if (x.style.display === "none") {
	    x.style.display = "block";
			voterbtn.disabled = true;
	  } else {
	    x.style.display = "none";
			voterbtn.disabled = false;
	  }
		// $.get("http://localhost:3000/getCandidates");
	});

	$("#voter-btn").on("click", function() {
	$(this).html($(this).html() == 'View' ? 'Hide' : 'View');
	var x = document.getElementById("voter-table");
	var partybtn = document.getElementById("party-btn");
	if (x.style.display === "none") {
		x.style.display = "block";
		partybtn.disabled = true;
	} else {
		x.style.display = "none";
		partybtn.disabled = false;
	}

});
});


// function loadVoterDetails(){
//
// 	var partybtn = document.getElementById('party-btn');
// 	var voterbtn = document.getElementById('voter-btn');
// 	var table = document.getElementById('party-table');
// 	var addbtn = document.getElementById('add-voter-btn');
//
// 	// table.style.display = "block";
// 	btn.style.display = "block"
//
// 	x.innerHTML = "Hide";
// 	y.disabled  = true;
//
// }

// function loadPartyDetails(){
//
// 	var partybtn = document.getElementById('party-btn');
// 	var voterbtn = document.getElementById('voter-btn');
// 	var table = document.getElementById('party-table');
// 	var addbtn = document.getElementById('add-candidate-btn');

// 	$("#party-btn").on("click", function() {
//   $(this).html($(this).html() == 'View' ? 'Hide' : 'View');
// });

// }
