function getInputValue(){

    var integer = document.getElementById("integer").value;
  
    var text = document.getElementById("answer");
    text.innerHTML = '';
    for (var i = 1; i <= integer; i++) {
        if (i % 15 == 0){
          text.append( i, "= ","fizzbuzz\n")
        }
        else if (i % 3 == 0){
            text.append( i, "= ","fizz \n")
        }
        else if (i % 5 == 0){
            text.append( i, "= ","buzz \n")
        }
        else{
          text.append(i, "= \n")
        }
    }
}

function getWordValue(){

    let wordValue = document.getElementById("script").value;
    var text = document.getElementById("answer");
    text.innerHTML = '';
    if(wordValue.includes("script",4) || wordValue.includes("Script",4)){
        text.append("TRUE")
    }
    else{
        text.append("FALSE")
    }
}

function isLeapYear(){
    var year = document.getElementById("year").value;
  
    var text = document.getElementById("answer");
    text.innerHTML = '';

    if((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)){

        text.append(year," is a leap year");
    }
    else{
        text.append(year, " is not a leap year");
    }

}