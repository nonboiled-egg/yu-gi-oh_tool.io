prev_deck_count = 0;
prev_target_count = 0;
prev_hand_count = 0;

$(function() {
  // initializing
  $("#deck_count").focus();
  //$("#target_count").val(1);
  //$("#hand_count").val(5);
  adjust_max();
  calculate();
  
  // setting onchange actions
  $("#deck_count").change(function(){
    calculate();
    adjust_max();
  });
  
  $("#target_count").change(calculate);
  
  $("#hand_count").change(calculate);
});

function is_out_of_bound(element){
    var min = parseInt(element.attr("min"));
    var max = parseInt(element.attr("max"));
    var val = parseInt(element.val());
    
    var less_than_min = val < min;
    var more_than_max = max < val;
   
    return less_than_min || more_than_max;
}

function adjust_max(){
  $("#target_count").attr({
    "max" : $("#deck_count").val()  
  });
  
  $("#hand_count").attr({
    "max" : $("#deck_count").val()  
  });
}

function calculate(){
  var deck_count = parseInt($("#deck_count").val());
  var target_count = parseInt($("#target_count").val());
  var hand_count = parseInt($("#hand_count").val());
  
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

