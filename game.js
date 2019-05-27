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
    'text':'Start Game',
    'type':'button',
    'class': 'btn btn-primary btn-lg'
  });

  this.$header= $(' <nav class="navbar navbar-expand-sm  justify-content-center"><h1>'+this.data.title+'</h1></nav> ');

  this.$gameArea=$('<div class="jumbotron text-center pt-1">\
                        <h1>'+this.data.descHeading+'</h1>\
                        <p>'+this.data.description+'</p>\
                        </div>');
  $startButton.appendTo(this.$gameArea);

  this.$header.appendTo($container);
  this.$gameArea.appendTo($container);


  $startButton.on('click',function(){
    that.$gameArea.empty();
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
      <a class="nav-link text-center" id="question_'+i+'" data-toggle="tab" href="#home"><h5>'+parseInt(i+1)+'</h5></a>\
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

  this.$questionDiv.appendTo(this.$gameWrapper);
  this.$buttonContainer.appendTo(this.$gameWrapper);

  this.$stepBar.appendTo(this.$gameWrapper);
  this.$progressBar.appendTo(this.$gameWrapper);
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

      that.response[e.questionId]={'answered':true, 'option':e.optionId};

      const nextStat = (that.currentIndex === that.questions.length-1)?true:false;

      if(!nextStat){
        that.nextQuestion();
        console.log(that.response);
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

  const str = JSON.stringify(this.response, null, 2);

  const $restartButton= $('<button>',{
    'text':'Restart Quiz',
    'type':'button'
  });



  this.$output = $('<div>'+str+'</div>').appendTo(this.$gameWrapper);

  $restartButton.appendTo(this.$container);

  $restartButton.on('click',function(){
    that.$container.empty();
    that.initGame(that.$container);
  });
}
