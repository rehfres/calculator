var button = document.querySelectorAll('button');
var displayInput = document.getElementById('display-input');
var displayResult = document.getElementById('display-result');
var upToAlert = document.getElementById('alert');
// console.log('butt');


var text = '';
var fSize = 0;
var dot = false;
var lastCharacter = (index) => text.charAt(text.length - index);
var cv, qw;

document.onclick = function () {

  if (event.target.tagName == 'BUTTON') {
    theButton = event.target;
    val = event.target.value;
    // if (typeof val = 'number')
    if (val === 'backspace') {
      if (lastCharacter(2) === ',') {
        text = text.slice(0, -2);
      } else {
        text = text.slice(0, -1);
      }
    } else if (val === 'clear') {
      text = '';
    } else if (['+','-','*','/'].indexOf(val) > -1 && ['+','-','*','/'].indexOf(lastCharacter(1)) > -1) {
      text = text.slice(0, -1);
      text += val;
    } else if (val === '.' && lastCharacter(1) === '%') {
      for (cv = text.length - 1; ['+','-','*','/','%','.'].indexOf(text.charAt(cv)) < 0 && cv > 0; cv--) {console.log(cv);}
      qw = text.lastIndexOf('.');
      if (qw >= cv && dot === false) {
        dot = true;
        text = text + '*0' + val;
      }
    } else if (val === '%' && ['+','-','*','/'].indexOf(lastCharacter(1)) > -1) {
      if (!lastCharacter(2) === '%') {
        text = text.slice(0, -1);
        text += val;
      } else {
        text = text.slice(0, -1);
      }
    } else if (['+','-','*','/','%'].indexOf(lastCharacter(1)) > -1 && val === lastCharacter(1)) {
    } else if (val !== '=' && val !== '.') {
      text += val;
    }
    if (theButton.className == 'numbers') {
      if (val !== '.') {
        for (cv = text.length - 1; ['+','-','*','/','%','.'].indexOf(text.charAt(cv)) < 0 && cv > 0; cv--) {console.log(cv);}
        text = text.slice(0, cv) + text.slice(cv).replace(/,/g,'');
        console.log(text);
        var zx = 0;
        for (qw = text.length - 1; qw > cv; qw--) {
          // console.log(qw + ' ' + text.charAt(qw) + ' ' + zx);
          zx++;
          zx = zx % 3;
          if (zx === 0 && ['+','-','*','/','%'].indexOf(text.charAt(qw-1)) < 0) {
            text = text.slice(0, qw) + "," + text.slice(qw);
            // console.log('-> ' + text);
          }
        }
        qw = text.lastIndexOf('.');
        if (qw >= cv) {
          dot = true;
          console.log(qw + ' --- ' + cv);
          text = text.slice(0, qw) + text.slice(qw).replace(/,/g,'');
        } else {dot = false;}
      } else {
        if (dot === false) {
          text += val;
          dot = true;
        }
      }
    }
    if (text.length < 17) {
      if (fSize != 1) {
        displayInput.style.fontSize = 31;
        fSize = 1;
      }
    }
    if (text.length >= 17 && text.length < 20) {
      if (fSize != 2) {
        displayInput.style.fontSize = 27;
        fSize = 2;
      }
    }
    if (text.length >= 20) {
      if (text.length > 88) {
        upToAlert.style.display = 'block';
        text=text.substring(0,88);
      } else {
        upToAlert.style.display = 'none';
      }
      if (fSize != 3) {
        displayInput.style.fontSize = 24;
        fSize = 3;
      }
    }
    displayInput.innerHTML = text;
    console.log(text);

    if (val === '=') {
      SchitaiBatika();
    }
    // console.log(openParenthesesCount);
  }

  SchitaiBatika = () => {
    text=text.replace(/,/g,'');
    // console.clear();
    // console.log(eval(text));
    for (let i = 0; i < text.length; i++) {
      if ( text.charAt(i) === '%') {
        console.log('i:' + i);
        let k = 0, j;
        let percentText;
        for (j = i-1; ['+','-','*','/','%'].indexOf(text[j]) < 0 && j >= 0; j--) { 
          k++;
        }
        console.log('j:' + j);
        console.log('k:' + k);
        percentText = text.substring(i-k, i+1);
        console.log(percentText);
        percentText = percentText.slice(0, -1);
        console.log(percentText);
        text = text.replace(percentText + '%',parseFloat(percentText)/100)
        console.log(text);
      }
    }
    result = parseFloat(eval(text).toFixed(2));
    displayResult.innerHTML = '=' + result;  
  }
}