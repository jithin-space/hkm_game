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
    'text':'clickMe',
    'type':'button'
  });


  $container.append('<h1>Welcome to Game</h1>');
  $startButton.appendTo($container);

  $startButton.on('click',function(){
    $startButton.remove();
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

  this.$numberDiv= $('<div><h1>Number</h1></div>');
  this.$questionDiv= $('<div></div>');



  this.$nextButton= $('<button>',{
    'text':'Next',
    'type':'button'
  });

  this.$prevButton= $('<button>',{
    'text':'Previous',
    'type':'button'
  });

  this.$submitButton=$('<button>',{
    'text': 'Submit',
    'type': 'button'
  });

  this.$numberDiv.appendTo(this.$gameWrapper);
  this.$questionDiv.appendTo(this.$gameWrapper);
  this.$nextButton.appendTo(this.$gameWrapper);
  this.$prevButton.appendTo(this.$gameWrapper);

  this.$gameWrapper.appendTo(this.$container);

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
  this.$numberDiv.text(this.currentIndex+1);
  this.$questionDiv.empty();
  this.$submitButton.remove();

  this.currentQuestion.attach(this.$questionDiv);

  const prevStat= (this.currentIndex === 0)?true:false;
  const nextStat = (this.currentIndex === this.questions.length-1)?true:false;

  this.$prevButton.attr('disabled',prevStat);
  this.$nextButton.attr('disabled',nextStat);

  if(nextStat){
      this.$submitButton.appendTo(this.$gameWrapper);
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
