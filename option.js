function Option(optionParameters){
  this.data=optionParameters;
}

Option.prototype.attach=function($container){
  const that=this;
 const $optionsDiv= $('<div><button>'+this.data.label+'</button></div>');
 $optionsDiv.appendTo($container);
 $optionsDiv.on('click',function(e){

   $(this).trigger({
     type: 'optionSelected',
     optionId: that.data.id
   });
 });

}
