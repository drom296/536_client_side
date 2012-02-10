jQuery(document).ready(function() {

	$("#orderedlist").addClass("red");
	
	$("#orderedlist > li").addClass("blue");
	
	$("#orderedlist > li:last").hover(function(){
		$(this).addClass("green");
	}, function(){
		$(this).removeClass("green");
	});
	
	$("#orderedlist").find("li").each(function(i){
		$(this).append(" BAM! "+ i);
	});
	
	$("#reset").click(function(){
		// reset the first form
		// $("form")[0].reset();
		// reset all forms
		$("form").each(function(){
			this.reset();
		})
	});
	
	// select all li that dont have ul as childred
	$("li").not(":has(ul)").css("border", "1px solid black");
	
	$("a[name]").css("background", "#eee");
	
	$("a[href*='/content/gallery']").css({
		fontSize : "2em",
		color		 : "blue",
		backgroundColor: "red"
	}).click(function(evt){
		// remove default click behavior
		evt.preventDefault();
	});
	
	$("#faq").find('dd').hide().end().find('dt').click(function(){
		$(this).next().slideToggle();
	});
	
	$("a").hover(function(){
		$(this).parents("p").addClass("highlight");
	}, function(){
		$(this).parents("p").removeClass("highlight");
	});
	
	// generate markup
	$("#rating").append("Please Rate");
	
	for(var i=1; i<=5; i++){
		$("#rating").append("<a href='#'>" + i + "</a> ");
	}
	
	// add markup to container and apply click handlers to anchors
	$("#rating a").click(function(e){
		// stop normal link click
		e.preventDefault();
		
		// send request
		$.post("rate.php", {rating: $(this).html()}, function(xml){
			// format and output the result
			$("#rating").html(
				"Thanks for rating, current average: " +
				$("average", xml).text() +
				", number of votes: " +
				$("count", xml).text()
			);
		});
	});
	
	
});
