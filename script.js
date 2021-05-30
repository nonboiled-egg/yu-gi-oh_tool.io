$(function() {
  // initializing
  adjust_max();
  calculate();
  
  // setting onchange actions
  $("#deck_count").change(function(){
    calculate();
    adjust_max();
  });
  
  $("#target_card_count").change(function(){
    calculate(); 
  });
  
  $("#hand_count").change(function(){
    calculate(); 
  });
});

function calculate(){
  var deck_count = $("#deck_count").val();
  var target_count = $("#target_card_count").val();
  var hand_count = $("#hand_count").val();
  
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
  $("#target_card_count").attr({
    "max" : $("#deck_count").val()  
  });
  
  $("#hand_count").attr({
    "max" : $("#deck_count").val()  
  });
}