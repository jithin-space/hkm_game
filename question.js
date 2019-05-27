

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

  this.$questionLabel =$('<div class="my-5"><h2 class="text-primary">'+this.data.label+'</h2></div>');
  this.$questionLabel.appendTo($container);

  that.$optionContainer = $('<div class="card-deck justify-content-center mb-5"></div>');

  this.options.forEach(function(opt){
    opt.attach(that.$optionContainer);
  });



  that.$optionContainer.appendTo($container);

  that.$optionContainer.on('optionSelected',function(e){
      e.stopPropagation();
      $(this).trigger({
        type: 'answered',
        questionId: that.data.id,
        optionId: e.optionId,
        optionData: e.optionData,
        isSingle: that.data.isSingle
      });
    });
}
