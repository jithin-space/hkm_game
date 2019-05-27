function Option(optionParameters){
  this.data=optionParameters;
}

Option.prototype.attach=function($container){
  const that=this;
 const $optionsDiv= $('<div class="card bg-default option-card p-1" style="max-width:250px;">\
                      <img class="card-img-top" src="'+this.data.image+'" alt="'+this.data.label+'"/>\
                      <div class="card-body">'+this.data.label+'</div></div>');
 $optionsDiv.appendTo($container);

 $optionsDiv.on('click',function(e){
   $(this).trigger({
     type: 'optionSelected',
     optionId: that.data.id,
     optionData: that.data
   });
 });

}
