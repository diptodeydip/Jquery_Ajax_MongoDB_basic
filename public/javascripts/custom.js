
function scrollBottom(){
	//focus scrolldiv to bottom
	$("#div").animate({ scrollTop: $('#div').prop("scrollHeight")}, 1000);
	//$("#div").animate({ scrollTop: $('#div')[0].scrollHeight}, 2000);
	//$('#div').scrollTop($('#div')[0].scrollHeight);
}

$( document ).ready(function() {

scrollBottom();

$.get("/get_data", function(data, status){
    //console.log(data);
    var i;
    for(i=0;i<data.length;i++){
    	var clonedRow = $("#tr").clone();
    	//clonedRow.attr('id',i+"");
    	clonedRow.find('#td1').html(data[i].name);
    	clonedRow.find('#td2').html(data[i].email);
    	//clonedRow.insertBefore('#table > tbody > tr:first');
    	//clonedRow.prependTo('#table');
    	clonedRow.appendTo('#table');
    }

   
  });



$("#save").click(function(){

	if(document.getElementById("name").value=="" || document.getElementById("email").value=="")return;

	var data = {};
	data["name"] = document.getElementById("name").value;
	data["email"] = document.getElementById("email").value;
	//data["name"] = $("#name").val();
	//data["email"] = $("#email").val();

	console.log(data);

  $.post("/add_info",
  data,
  function(data, status){
    //alert("Data: " + data + "\nStatus: " + status);

    var clonedRow = $("#tr").clone();
    	clonedRow.find('#td1').html(document.getElementById("name").value);
    	clonedRow.find('#td2').html(document.getElementById("email").value);
    	clonedRow.appendTo('#table');
    	scrollBottom();

  });

});

});