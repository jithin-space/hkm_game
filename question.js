

function Question(questionParameters){
  this.data=questionParameters;
  this.createOptions();

}

Question.prototype.createOptions = function(){

  const that=this;

  that.options=[];

  that.data.options.forEach(function(inp){
   that.options.push(new Option(inp));
  });

}

Question.prototype.attach = function($container){

  const that=this;

  this.$questionLabel =$('<div>'+this.data.label+'</button>');
  this.$questionLabel.appendTo($container);

  that.$optionContainer = $('<div></div>');
  this.options.forEach(function(opt){
    opt.attach(that.$optionContainer);
  });



  that.$optionContainer.appendTo($container);

  that.$optionContainer.on('optionSelected',function(e){
      e.stopPropagation();
      $(this).trigger({
        type: 'answered',
        questionId: that.data.id,
        optionId: e.optionId
      });
    });
}