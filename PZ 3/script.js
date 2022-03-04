function doIt(){
  var inputKey = document.getElementById('input-key');
  var input1 = document.getElementById('input1');
  var mode = document.forms.form1.mode.value;
  var key = inputKey.value
  if(key.length > 1 ){
    var ar = key.split('').sort();
    var ch = ar[0];
    for (let i = 1; i < ar.length; i++) {
      if(ch == ar[i]){
        alert("Символы в ключе не могут повторяться");
        return false;
      }
      ch = ar[i];
    }
  }else if(key.length > 0 &&  key.length < 2 ) {
    alert("Ключ не может быть меньше двух символов");
    return false;
  };
  if(input1.value.length == 0){
    alert("Поле текста не может быть пустим");
    return false;
  }
  if(mode == 1){
    encode();
  }else{
    decode();
  }
}

function encode(){
  var inputKey = document.getElementById('input-key');
  var input1 = document.getElementById('input1');
  var output1 = document.getElementById('output1');
  var key = inputKey.value;
  var text = input1.value;
  var mat = [[]];
  var chars = []; // Массив для раскладки позиций букв
  var ar = key.split('').sort();//Буквы ключа в алфавитном порядке
  var shirina = key.length;
  var visota = Math.ceil(text.length / key.length);
  var y = 0, x = 0;
  var output = '';
  for (var i = 0; i < text.length; i++) { //Заполнение матрицы
    mat[y][x] = text[i]; x++;
    if(x > shirina-1 && i < text.length-1){
      x = 0; y++;
      mat[y] = [];
    }
  }
  for (var i = 0; i < ar.length; i++) {//Размещение очередности в массиве
    var pos = key.indexOf(ar[i]);
    chars[pos] = i;
  }
  for (var i = 0; i < shirina; i++) {//Формирование кодированного сообщения
    for (var j = 0; j < visota; j++) {
      var pos = chars.indexOf(i);
      if(mat[j][pos] != undefined){
        if (mat[j][pos] != ' ')
        output+= mat[j][pos];
        else output+= '_';
      }else{
        output+= mat[j][pos] =  '';
      }
    }
  }
  output1.value = output;
}

function decode(){
  var inputKey = document.getElementById('input-key');
  var input1 = document.getElementById('input1');
  var output1 = document.getElementById('output1');
  var key = inputKey.value;
  var text = input1.value;
  var mat = [[]];
  var shirina = key.length;
  var visota = Math.ceil(text.length / key.length);
  var bottomRow =  shirina - (shirina * visota - text.length);
  var ar = key.split('').sort(); //алфавитный порядок символов ключа
  var chars = [];
  var output = '';
  for (var i = 0; i < visota; i++){//Создание матрицы
    if(i < Math.floor(text.length / shirina)){
      mat[i] = new Array(shirina)
    }else{
      mat[i] = new Array(bottomRow);
    }
  }
  for (var i = 0; i < ar.length; i++) {
    var pos = key.indexOf(ar[i]);
    chars[pos] = i;
  }
  var position = 0;
  for (var i = 0; i < shirina ; i++) { //Заполнение матрицы
    for (var j = 0; j < visota; j++) {
      var pos = chars.indexOf(i)
      if( j*shirina + pos < text.length  ){
        mat[j][pos] = text[position];
        position++;
      }
    }
  }
  for (var i = 0; i < visota; i++) { //Формирование строки дешифрованного текста
    for (var j = 0; j < shirina; j++) {
      var bukva = mat[i]?.[j];
      if(bukva != undefined){
        if(bukva == '_') 
          output += ' ';
        else output+= bukva;
      }
    }
  }
  output1.value = output;
}

