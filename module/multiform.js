
var multiform = (function(){

  var nextEl = document.querySelector("#nextBtn"),
    prevEl = document.querySelector("#prevBtn"),
    allInputsEL = document.getElementsByTagName("input");

  // event listeners
  nextEl.addEventListener('click', function(){ nextPrev(1) });
  prevEl.addEventListener('click', function(){ nextPrev(-1) });
  Array.prototype.forEach.call(allInputsEL, function(el, i){
    el.addEventListener("input", function(){
        this.setAttribute("class", "");
      }
    );
  });


  // functions
  function showTab(n) {
    var tabs = document.getElementsByClassName("tab");

    tabs[n].style.display = "block";

    // if first tab, don't show prev button
    if (n === 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }

    // if end of form, add Submit button
    if (n === (tabs.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
      document.getElementById("nextBtn").className = "btn btn-success";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }

    updateStep(n)
  }

  function nextPrev(n) {

    var tabs = document.getElementsByClassName("tab");

    // exit the function if any field in the current tab is invalid:
    if (n === 1 && !validateForm()) return false;

    // hide the current tab:
    tabs[currentTab].style.display = "none";

    // increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // if end of form,
    if (currentTab >= tabs.length) {
      document.getElementById("regForm").submit();
      alert("Form submitted");
      return false;
    } else {
      showTab(currentTab);
    }
  }

  function validateForm() {
    var tabs, currentInput, i, dataType, valid = true;

    // get all tabs
    tabs = document.getElementsByClassName("tab");

    // get current input
    currentInput = tabs[currentTab].getElementsByTagName("input");

    // loop through fields in current tab
    for ( i = 0; i < currentInput.length; i++ ) {
      dataType = currentInput[i].dataset.type;

      // check for empty input
      if ( currentInput[i].value === "" ) {
        currentInput[i].className += " invalid";
        valid = false;
      }

      // check email
      if ( dataType === "email" && !isEmail( currentInput[i].value ) ){
        currentInput[i].className += " invalid";
        valid = false;
      }

      // check number
      if ( dataType === "number" && !isNumber(currentInput[i].value) ){
        currentInput[i].className += " invalid";
        valid = false;
      }

    }

    // If valid, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }

    return valid;
  }

  function updateStep(n) {
    var i, steps = document.getElementsByClassName("step");
    for (i = 0; i < steps.length; i++) {
      steps[i].className = steps[i].className.replace(" active", "");
    }
    steps[n].className += " active";
  }

  function isEmail(str){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  }

  function isNumber(str) {
    var re = /^\d+$/;
    return re.test(str);
  }


  return {
    showTab: showTab
  };
})();
