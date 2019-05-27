function Game(gameParameters){
  this.data = gameParameters;
  this.addQuestions();
}

Game.prototype.addQuestions = function(){

  const that=this;

  that.questions=[];

   that.data.questions.forEach(function(inp){
     that.questions.push(new Question(inp));
   });

}



Game.prototype.initGame = function($container){

  const that=this;
  that.$container = $container;

  const $startButton= $('<button>',{
    'text':'തുടങ്ങുക',
    'type':'button',
    'class': 'btn btn-primary btn-lg'
  });


  this.$gameArea=$('<div class="jumbotron game-area text-center pt-4">\
                        </div>');
  this.$descArea= $('<div><h2 class="mt-5">'+this.data.descHeading+'</h2>\
    <p class="text-justify p-2">'+this.data.description+'</p></div>');

  // this.$header= $(' <nav class="navbar navbar-expand-sm  justify-content-center"><h1>'+this.data.title+'</h1></nav> ');

  this.$header= $('<div class="card bg-info">\
    <div class="card-body text-white"><h2>'+this.data.title+'</h2></div>\
    </div>');

  this.$header.appendTo(this.$gameArea);
  this.$descArea.appendTo(this.$gameArea);
  $startButton.appendTo(this.$gameArea);


  this.$gameArea.appendTo($container);


  $startButton.on('click',function(){
    that.$gameArea.empty();
    that.$header.remove();
    that.startGame();
  });
}

Game.prototype.startGame = function(){

  this.response={};
  this.gameOn=true;
  this.currentQuestion=this.questions[0];
  this.currentIndex=0;

  this.createDOMElements();

  this.showQuestion()
}



Game.prototype.createDOMElements= function(){

  const that=this;

  this.$gameWrapper=$('<div></div>');


  this.$questionDiv= $('<div class="mx-auto"></div>');

  this.$stepBar= $('<ul class="nav nav-tabs wizard"></ul>');

  for(let i=0;i<this.questions.length;i++){
    $('<li class="nav-item mx-auto">\
      <a class="nav-link text-center bg-white" id="question_'+i+'" data-toggle="tab" href="#home"><h4>'+parseInt(i+1)+'</h4></a>\
    </li>').appendTo(that.$stepBar)
  }

  this.$progressBar=$('<div class="progress mx-auto">\
  <div class="progress-bar" style="width:0%"></div>\
  </div>');




  this.$nextButton= $('<button>',{
    'html':'Next<i class="fa fa-arrow-right"></i>',
    'type':'button',
    'class': 'btn btn-success btn-lg float-sm-right'
  });

  this.$prevButton= $('<button>',{
    'html':'<i class="fa fa-arrow-left"></i>Prev',
    'type':'button',
    'class': 'btn btn-danger btn-lg float-sm-left'
  });

  this.$submitButton=$('<button>',{
    'html': 'Submit<i class="fa fa-angle-double-right"></i>',
    'type': 'button',
    'class': 'btn btn-primary btn-lg float-sm-right '
  });


  this.$buttonContainer=$('<div id="button-container" class="mb-2"></div>');
  this.$prevButton.appendTo(this.$buttonContainer);
  this.$nextButton.appendTo(this.$buttonContainer);

  this.$stepBar.appendTo(this.$gameWrapper);
  this.$progressBar.appendTo(this.$gameWrapper);

  this.$questionDiv.appendTo(this.$gameWrapper);
  this.$buttonContainer.appendTo(this.$gameWrapper);


  this.$gameWrapper.appendTo(this.$gameArea);


  this.$nextButton.on('click',function(){

    that.response[that.currentIndex]={'answered':false, 'option':''};
    that.nextQuestion();

  });

  this.$prevButton.on('click',function(){
    that.response[that.currentIndex-1]={'answered':false, 'option':''};
    that.prevQuestion();
  });

  this.$questionDiv.on('answered',function(e){

      that.response[e.questionId]={'answered':true, 'option':e.optionId,'optionData': e.optionData};

      const nextStat = (that.currentIndex === that.questions.length-1)?true:false;

      if(!nextStat){
        that.nextQuestion();

      }
      else{
        that.gameOn=false;
        that.showOutput();
      }


  });



}

Game.prototype.showQuestion = function(){
  const that=this;

  this.$questionDiv.empty();
  this.$submitButton.remove();

  this.currentQuestion.attach(this.$questionDiv);

  const prevStat= (this.currentIndex === 0)?true:false;
  const nextStat = (this.currentIndex === this.questions.length-1)?true:false;

  this.$prevButton.toggle(!prevStat);
  this.$nextButton.toggle(!nextStat);

  this.$stepBar.find('#question_'+this.currentIndex).addClass('active');

  const unitIncr= (0.5/this.questions.length);
  this.$progressBar.find('.progress-bar').css('width', (((this.currentIndex/this.questions.length)+unitIncr)*100)+'%');


  if(nextStat){
      this.$submitButton.appendTo(this.$buttonContainer);
      this.$nextButton.hide();
      this.$submitButton.on('click',function(){
        that.gameOn=false;
        that.response[that.currentIndex]={'answered':false, 'option':''};
        that.showOutput();
      });
  }


}

Game.prototype.nextQuestion = function(){

  this.currentQuestion = this.questions[this.currentIndex+1];
  this.currentIndex=this.currentQuestion.data.id;
  this.showQuestion();
}

Game.prototype.prevQuestion = function(){
  this.$stepBar.find('#question_'+this.currentIndex).removeClass('active');
  this.currentQuestion = this.questions[this.currentIndex-1];
  this.currentIndex=this.currentQuestion.data.id;
  this.showQuestion();
}

Game.prototype.showOutput = function(){

  const that=this;

  this.$gameWrapper.empty();

  const output = this.calculateResults();

  const $restartButton= $('<button>',{
    'html':'Restart Quiz<i class="fa fa-retry"></i>',
    'type':'button',
    'class': 'btn btn-primary btn-lg'
  });



  // this.$output = $('<div><h1>Your Score:'+output['totalScore']+'</h1><h2>Avg User Index:'+output['avgIndex']+'<h2></div>').modal('show');


  // this.$output= $('<div class="modal modal-sm fade" id="myModal">\
  //       <div class="modal-dialog modal-dialog-centered">\
  //         <div class="modal-content">\
  //           <div class="modal-header">\
  //             <h4 class="modal-title">Your Results</h4>\
  //             <button type="button" class="close" data-dismiss="modal">&times;</button>\
  //           </div>\
  //           <div class="modal-body">\
  //             <h1>Your Score:'+output['totalScore']+'</h1><h2>Avg User Index:'+output['avgIndex']+'<h2>\
  //           </div>\
  //           <div class="modal-footer">\
  //             <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>\
  //           </div>\
  //         </div>\
  //       </div>\
  //     </div>').modal('show');


      this.$output= $('<div class="modal  fade" id="myModal">\
            <div class="modal-dialog modal-dialog-centered">\
              <div class="modal-content">\
                <div class="modal-body card">\
                    <img class="card-img-top rounded-circle text-center badge-image" src="images/trophy.png" alt="Card image">\
                    <div class="card-body text-center">\
                      <h1 class="card-title">Your Score:'+output['totalScore']+'</h1>\
                      <h2 class="card-text">Avg User Index:'+output['avgIndex']+'<h2>\
                      <button type="button" class="btn btn-danger mt-2" data-dismiss="modal">Close</button>\
                  </div>\
                </div>\
              </div>\
            </div>\
          </div>').modal('show');


  // .appendTo(this.$gameWrapper);

  this.$feedbackContainer=$('<table>',{
    'class': 'table table-striped table-bordered table-sm table-responsive',
    'html':'<tr><th>Number</th><th>Question</th><th>Answerd</th><th>Answer</th><th>Feedback</th></tr>'
  });




  const feedback = that.response;
  delete feedback['0'];


  Object.keys(feedback).forEach(function(rec){

    const $rec= $('<tr><td>'+rec+'</td><td>'+that.questions[rec].data['label']+'</td><td>'+feedback[rec]['answered']+'</td></tr>');

    if(feedback[rec]['answered']){
     $('<td>'+feedback[rec]['optionData']['label']+'</td>').appendTo($rec);
    $('<td>'+feedback[rec]['optionData']['feedback']+'</td>').appendTo($rec);
    }
    else{
        $('<td></td>').appendTo($rec);
        $('<td></td>').appendTo($rec);
    }
    that.$feedbackContainer.append($rec);
  });

  $('<h2 class="text-center">Your Responses</h2>').appendTo(this.$gameWrapper);
  this.$feedbackContainer.appendTo(this.$gameWrapper);

  $restartButton.appendTo(this.$gameWrapper);


  $restartButton.on('click',function(){
    that.$container.empty();
    that.initGame(that.$container);
  });
}

Game.prototype.calculateResults = function(){

  const that=this;
  let totalScore=0;
  let totalIndex=0;
  const unit= (that.response['0']['optionData'])?parseInt(that.response['0']['optionData']['unitConsumption']):1;

  Object.keys(this.response).forEach(function(inp){
    if(that.response[inp]['answered']){
       let data= that.response[inp]['optionData'];
       totalScore+=parseInt(data.score);
       if(inp !== "0"){
         if(that.response[inp]['isSingle']){
           totalIndex+=(parseInt(data.unitConsumption)*unit);
         }
         else{
           totalIndex+=parseInt(data.unitConsumption);
         }
       }

    }
  });

  return {'totalScore':totalScore,'avgIndex': totalIndex/unit};
}
