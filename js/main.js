$(document).ready(function () {
	count = 0;
	default_member = 1;
	calculation = 0;

	lng = "mal";

	if (lng == "mal") {

		$("#quesarea").html("വാട്ടർ ഫൂട്പ്രിന്റ് കാൽകുലേറ്റർ ");
		$("#level1").html("തുടങ്ങുക ");

	}

	$(".game, #home, #score, .time, #questionscreen, #volume_icon,.questions,#result, #submit").hide();

	function reset() {

		count = 1;
		calculation = 0;

		$(".game, #home").hide();
		$("#listing_page,#copyright,#quit").show();
		$(".game, #home, #score, .time, #questionscreen, #volume_icon,#quesarea2,.questions,#result").hide();
		$("audio").trigger("pause");


	}


	$(".level").click(function () {
		calculation = 0;
		//calculation=350*1;

		$("#buttonclick").trigger("play");
		order = $(this).data("order");
		$("#listing_page,#copyright").hide();
		$("#quit").fadeOut();
		$("#home, .time, #volume_icon, #score").fadeIn(1000);



		result = $.getJSON("json/question.json", function() {
			output = result.responseJSON.questions;
			console.log(output);
			questions();
			});


	});

	function questions(){
	$("#container_level" + order).show('slide', {
			direction: 'right'
		}, 1000);
	$("#question-1").show('slide', {
			direction: 'right'
		}, 1000);
	$('#result').show();
	head_image=output[count].headImage;
	category=output[count].category;
	question = output[count].label;
	question_id = output[count].id;

	//choices=output[count].options;
	options=output[count].options;


	//datas=output[count].datas;
	 $("#question1-category").html(question_id+'. <img src="'+head_image+'">'+category);
	$("#question-text-"+(question_id)).text(question);
	for (i=0; i<options.length; i++){
	 $("#choice-set").append('<div  id="question'+question_id+'-choice'+options[i].id+'" class="choice" data-score="'+options[i].score+'" data-value="'+options[i].unitConsumption+'" data-feedback="'+options[i].feedback+'"><img src="'+options[i].image+'"><div class="pill-button">'+options[i].label+'</div></div>');
		}
	}//questions

	$("#volume_icon").on('click', function () {
		$("#questaudio").trigger('play');
	});

	$(".choice").click(function () {
		$(".choice").removeClass("chosen");
		$(this).addClass("chosen");


	});

	$(document).on('click', '.prev-btn', function () {
	$("#buttonclick").trigger("play");
	prev_calculation=calculation;

	$("#container_level1").hide('slide', {
			direction: 'right'
		}, 1000, function () {
			$(".questions").hide();
			count--;
			$("#vol").html(calculation);


			//alert("nextclicked- question no:-"+ count);

			$("#container_level1").show('slide', {
				direction: 'left'
			}, 700);
			$("#question-" + count).show();
	});
	});


	$(document).on('click', '.choice, .next-btn', function () {
	$("#buttonclick").trigger("play");
		if ($(this).hasClass("next-btn")) {

			current_element = $(this).parent().children("#response_area").children().children(".chosen");
		} else {
			current_element = $(this);
			clicked="choice";
		}

			if (count<= output.length){

			$("#choice-set").empty();
			count++;
			questions();


			}else{
			alert("survey ends");
			}
			$("#vol").html(calculation);

			$("#question-" + count).show();

			//alert("nextclicked- question no:-"+ count);







	});

	/*  const remote = require('electron').remote
		$('#quit-btn').on('click', e => {
    	remote.getCurrentWindow().close()
	});*/
	$("#home").click(function () {
		$("#buttonclick").trigger("play");
		reset();
	});

});
