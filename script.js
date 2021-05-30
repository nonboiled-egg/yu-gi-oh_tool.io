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
  
  var result = combinations(deck_count-target_count, hand_count);
  result /= combinations(deck_count, hand_count);
  result *= 10000;
  result = Math.ceil(result);
  result /= 100;
  
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

function product_Range(a,b) {
  var prd = a,i = a;
 
  while (i++< b) {
    prd*=i;
  }
  return prd;
}

function combinations(n, r) 
{
  if (n==r) 
  {
    return 1;
  } 
  else 
  {
    r=(r < n-r) ? n-r : r;
    return product_Range(r+1, n)/product_Range(1,n-r);
  }
}