$(document).ready(function () {
	count = 0;
	default_member = 1;
	calculation = 0;
	lng = "mal";
	slide_dir="right";
	if (lng == "mal") {

		$("#quesarea").html("ജല ബഡ്ജറ്റ് വീട്ടിലും ");
		$("#level1").html("തുടങ്ങുക ");

	}

	$(".game, #home, #score, .time, #questionscreen, #volume_icon,#result, #submit").hide();
	
	function reset() {

		count = 0;
		$("#choice-set").empty();
		calculation = 0;
		$("#listing_page,#copyright,#quit").show();
		$(".game, #home, #score, .time, #questionscreen, #volume_icon,#quesarea2,#result").hide();
		$("audio").trigger("pause");


	}

	$(".start").click(function () {
		calculation = 0;
		//calculation=350*1;
		$("#buttonclick").trigger("play");
		levelId = $(this).attr('id');
		order = $(this).data("order");
		$("#listing_page,#copyright").hide();
		$("#quit").fadeOut();
		$("#home, .time, #volume_icon, #score").fadeIn(1000);
		result = $.getJSON("json/question.json", function() {
			output = result.responseJSON.questions;
			console.log(output);
			//$(".questions").hide();
			questions();		
	});
	});

	function questions(){

	if(count<1){
	$("#prev").hide();
	}else{
	$("#prev").show();
	}
	$("#choice-set").empty();
	question = output[count].label;
	question_id = output[count].id;

	//choices=output[count].options;
	options=output[count].options;

	grid= 12/options.length;
	//datas=output[count].datas;
	$("#question-text").text(question);
	for (i=0; i<options.length; i++){
	 $("#choice-set").append('<div  id="question'+question_id+'-choice'+options[i].id+'" class="choice col-'+grid+'" data-score="'+options[i].score+'" data-value="'+options[i].unitConsumption+'" data-feedback="'+options[i].feedback+'"><img src="'+options[i].image+'"><div class="pill-button">'+options[i].label+'</div></div>');
		}
	$("#container_level1").show('slide', {
				direction: slide_dir
			}, 700);
				
	
	$('#result').show();
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
		}, 700, function () {
			
			count--;
			$("#vol").html(calculation);
			$("#choice-set").empty();

			//alert("nextclicked- question no:-"+ count);
			slide_dir="left";
			questions();
			
		
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


		/*switch (count) {

			case 1:
				{
					member_count = $(this).prev().children().children().val();
					member = parseInt(member_count);
					members = default_member * member;
					break;
				}

			case 2:
				{
					shower = parseInt(current_element.data('value'));
					calculation = shower * members;
					break;
				}

			case 3:
				{
					bath = parseInt($(this).parent().children("#response_area").children().children("input").val());
					calculation = calculation * bath;
					break;
				}

			case 4:
				{
					shower_head = parseFloat(current_element.data('value'));
					calculation = calculation * shower_head;
					break;
				}

			case 5:
				{
					sink = parseInt(current_element.data('value'));
					calculation = calculation + sink;
					break;
				}

			case 6:
				{
					low_flow = parseFloat(current_element.data('value'));
					calculation = (calculation - sink) + (low_flow * sink);
					break;
				}

			case 7:
				{
					toilet = parseInt(current_element.data('value'));
					calculation = calculation * 1;
					break;
				}

			case 8:
				{
					flush = parseInt(current_element.data('value'));
					calculation = calculation + (flush * toilet);
					//alert(calculation);
					break;
				}

			case 9:
				{
					clean_dishes = parseInt($(this).parent().children("#response_area").children().children("input").val());
					//alert(bath);
					calculation = calculation * 1;
					break;
				}

			case 10:
				{

					dishes_time = parseInt(current_element.data('value'));
					dishes_usage = clean_dishes * dishes_time;
					calculation = calculation + dishes_usage;
					//alert(calculation);
					break;

				}

			case 11:
				{
					low_flow_kitchen = parseFloat(current_element.data('value'));
					dishes_water_usage = dishes_usage * low_flow_kitchen;
					calculation = (calculation - dishes_usage) + dishes_water_usage;
					//alert(calculation);
					break;
				}

			case 12:
				{
					method =
					cleaning_method = parseFloat(current_element.data('value'));
					calculation = (calculation - dishes_water_usage) + (cleaning_method * dishes_water_usage);
					break;
				}

			case 13:
				{
					laundry = parseInt(current_element.data('value'));
					calculation = calculation + laundry;

					break;
				}

			case 14:
				{
					watering_plants = current_element.data('value');
					if (watering_plants == "no") {
						count = count + 2;
					} else {
						count = count;
					}

					break;
				}

			case 15:
				{
					garden_area = parseInt(current_element.data('value'));
					calculation = calculation + garden_area;
					break;
				}

			case 16:
				{
					watering_time = parseInt($(this).parent().children("#response_area").children().children("input").val());
					calculation = (calculation - garden_area) + (garden_area * watering_time)
					break;
				}

			case 18:
				{
					vehicle = current_element.data('value');
					if (vehicle == "no") {
						count=count+2;
					}
					break;
				}
			case 19:
				{
					vehicle_type = parseInt(current_element.data('value'));
					break;

				}
			case 20:
				{

					cleaning_vehicle = parseInt(current_element.data('value'));
					calculation = calculation + (vehicle_type * cleaning_vehicle);
					break;
				}

		} *///switch

			if (count< output.length-1){


			
	$("#container_level1").hide('slide', {
			direction: 'left'
		}, 700, function () {
		
			
			count++;
			$("#vol").html(calculation);

			slide_dir="right";
			questions();
			
			//alert("nextclicked- question no:-"+ count);
			
			
			
	});		
			}else{
			alert("survey ends");
			}
			$("#vol").html(calculation);

			

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
