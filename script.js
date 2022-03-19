prev_deck_count = 0;
prev_target_count = 0;
prev_hand_count = 0;

$(function() {
  // initializing
   $("#target_count").attr({
    "value" : 1  
  });
  
  $("#hand_count").attr({
    "value" : 5
  });
  
  $("#deck_count").attr({
    "value" : 40
  });
  
  adjust_max();
  calculate();
  
  // setting onchange actions
  $("#deck_count").change(function(){
    calculate();
    adjust_max();
  });
  
  $("#target_count").change(function(){
    calculate(); 
  });
  
  $("#hand_count").change(function(){
    calculate(); 
  });
});

function is_out_of_bound(element){
    var min = element.attr("min");
    var max = element.attr("max");
    var val = element.val();
    
    console.log("x < " + max);
    console.log("x = " + val);
    console.log(max < val);
   
    return val < min || max < val;
}

function calculate(){
  var deck_count = $("#deck_count").val();
  var target_count = $("#target_count").val();
  var hand_count = $("#hand_count").val();
  
  if(is_out_of_bound($("#deck_count"))){
    $("#deck_count").val(prev_deck_count);
    alert("deck out of range");
    return;
  }
  
  if(is_out_of_bound($("#target_count"))){
    $("#target_count").val(prev_target_count);
    alert("target out of range");
    return;
  }
  
  if(is_out_of_bound($("#hand_count"))){
    $("#hand_count").val(prev_hand_count);
    alert("hand out of range");
    return;
  }
  
  prev_deck_count = deck_count;
  prev_target_count = target_count;
  prev_hand_count = hand_count;
  
  var result = 0;
  
  if(target_count == 0 ){
    result = 100;
  }
  
  else if( deck_count == hand_count || deck_count - hand_count < target_count ){
    result = 0;
  }
  
  else {
    result = math.combinations(deck_count-target_count, hand_count);
    result /= math.combinations(deck_count, hand_count);
    result *= 1000000;
    result = Math.floor(result);
    result /= 10000;
  }
  
  result += "%";
  
  $("#result").html(result);
}

function adjust_max(){
  $("#target_count").attr({
    "max" : $("#deck_count").val()  
  });
  
  $("#hand_count").attr({
    "max" : $("#deck_count").val()  
  });
}