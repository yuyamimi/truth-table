//let input = process.argv[2];//入力
onload = function () {

let operatorList = "￢∧∨≠→≡";//論理記号一覧
let specialchar = "01";//正負
let formula, bit;//01を表示するformula[i][j]の形式になる、2変数ならbitが４になる
  
var d = document;
var inputs = d.body.getElementsByTagName("INPUT");
var execButton = inputs[0];

var dl = d.body.getElementsByTagName("DL")[0];
let input = dl.getElementsByTagName("TEXTAREA")[0];
var ruleSwitch = dl.getElementsByTagName("DT")[0].appendChild(d.createElement("button"));
  var rule = dl.getElementsByTagName("DD")[0];
  var table = d.body.appendChild(d.createElement("TABLE")).appendChild(d.createElement("TBODY"));
  var source = d.body.appendChild(d.createElement("PRE"));

  dl.appendChild(d.createElement("DT")).innerHTML = "結果";
  var result = dl.appendChild(d.createElement("DD"));

table.parentNode.border = 1;
source.appendChild(d.createTextNode(""));

execButton.onclick = function () {
  if (!exec(translateON.checked ? translate(textarea.value) : textarea.value))
    return showResult("エラー\n" + error);

  while (table.firstChild)
    table.removeChild(table.firstChild);

  var tr = table.appendChild(d.createElement("TR"));

  for (var i in formula)
    if (specialchar.indexOf(i) < 0)
      tr.appendChild(d.createElement("TH")).innerHTML = i;
  for (var i = 0; i < bit; ++i) {
    tr = table.appendChild(d.createElement("TR"));
    for (var j in formula)
      if (specialchar.indexOf(j) < 0)
        tr.appendChild(d.createElement("TD")).innerHTML = specialchar.charAt(formula[j][i]+0);
  }

  table.style.display = printHTML.checked ? "none" : "";
  source.style.display = printHTML.checked ? "" : "none";
  if (printHTML.checked)
    source.firstChild.nodeValue =
      ("<TABLE>" + table.innerHTML + "</TABLE>").replace(/<[^>]+>/g, function (s) {
        return s.toLowerCase();
      }).replace(/[ 　\t\r\n]/g, "").replace(/<tr>/g, "\t<tr>").replace(/<(\/tr|table)>/g, "<$1>\n");
  showResultHTML('出力完了(<A HREF="./logic.html?' + encodeURIComponent(textarea.value) + '&' +
    (translateON.checked << 2 | printHTML.checked << 1 | printNumber.checked) + '">この結果のURL</A>)');
}
execButton.onclick = function () {
  analysis(input.value) 
    var tr = table.appendChild(d.createElement("TR"));
for (var i in formula)
      if (specialchar.indexOf(i) < 0)
      //console.log(i);
      tr.appendChild(d.createElement("TH")).innerHTML = i;
for (var i = 0; i < bit; ++i) {
  tr = table.appendChild(d.createElement("TR"));
for (var j in formula)
  if (specialchar.indexOf(j) < 0)
  // console.log( specialchar.charAt(formula[j][i]+0));
  tr.appendChild(d.createElement("TD")).innerHTML = specialchar.charAt(formula[j][i]+0);
}
}

function analysis(input) {
    bit = 1;//初期１にする
    formula = {};
    let formulaLength = 0;

    //exlusionには￢∧∨≠→≡()01が最初に格納
    //iは論理式のかず φ∧ψなら３個
    //chrに次々論理式入れる
    //もし、chrが命題変数なら、bit２倍にして、formulalengthも一つ増やしてφ１ψ１にして、exclusionに命題変数入れる

    for (var i = 0, exclusion = operatorList + "()" + specialchar; i < input.length; ++i) {
        var chr = input.charAt(i);
        if (exclusion.indexOf(chr) < 0) {
            bit = bit << 1;
            ++formulaLength;　//命題変数の数　exclusion￢∧∨≠→≡()FTφψ
            formula[chr] = 1; //{ 'φ': 1, 'ψ': 1 }
            exclusion += chr;
        }
    }

    //φψが01でなければ、formulalengthは減らして、formula[φ]を配列にする
    //&は左右を比べて真偽をみる>>は左にformulalength分シフト

    for (var i in formula) {
        if (specialchar.indexOf(i) < 0) {
            --formulaLength;
            formula[i] = new Array(bit);
            for (var j = 0; j < bit; ++j)
                formula[i][j] = (j >> formulaLength) & 1;
        }
    } //formula { 'φ': [ 0, 0, 1, 1 ], 'ψ': [ 0, 1, 0, 1 ] }

//formula[0]と[1]にも配列
    formula[specialchar.charAt(0)] = new Array(bit);
    formula[specialchar.charAt(1)] = new Array(bit);

    for (var i = 0; i < bit; ++i){
            formula[specialchar.charAt(1)][i] = !(formula[specialchar.charAt(0)][i] = 0);
   //  formula[specialchar.charAt(1)][i]:)true
    //formula[specialchar.charAt(0)][i]):0
  }
  parse(input)
}

function operation(aOperator, aRightOperand, aLeftOperand) {

    var returnValue = [];

    if (aOperator == "￢") {
      for (var i = 0; i < bit; ++i)
        returnValue[i] = !aRightOperand[i];
    }else if (aLeftOperand) switch (aOperator) {
      case "∧":
        for (var i = 0; i < bit; ++i)
          returnValue[i] = aLeftOperand[i] && aRightOperand[i]; 
          break;
      case "∨":
        for (var i = 0; i < bit; ++i)
          returnValue[i] = aLeftOperand[i] || aRightOperand[i];
        break;
      case "≠":
        for (var i = 0; i < bit; ++i)
          returnValue[i] = !(aLeftOperand[i] == aRightOperand[i]);
        break;
      case "→":
        for (var i = 0; i < bit; ++i)
          returnValue[i] = !aLeftOperand[i] || aRightOperand[i];
        break;
      case "≡":
        for (var i = 0; i < bit; ++i)
          returnValue[i] = (aLeftOperand[i] == aRightOperand[i]);
       break;
    }
    
 
    return returnValue
  }

function parse(aStr) {
    var leftOperand, notFlag = 0;

    //最初が￢だった時にnotflag を１にする
    if (aStr.charAt(0) == "￢")
        notFlag = 1;
//最初が￢だった場合に￢の次から論理式を調べていく
    for (var i = notFlag; i < aStr.length; ++i) {
        var chr = aStr.charAt(i);
        //もし論理式ではない場合for抜ける
        if (operatorList.indexOf(chr) < 0)
          break;
    }
//iがnotflagと同じ値であれば、formula[chr]をlefOperantに。偽であればparse(aStr.substr(notFlag + 1, i - 1 - notFlag))
    leftOperand = (i == notFlag ? formula[chr] :parse(aStr.substr(notFlag + 1, i - 1 - notFlag)));//文字列に対して「substr()」を実行し、引数に「開始位置」と「文字数」を設定することで切り出しができます。
    if (notFlag) {
        if (leftOperand = operation("￢", leftOperand))
            formula[aStr.substr(0, i + 1)] = leftOperand;
        else
            return;
    }

    var opPos = 0, operator, priority, newPos, rightOperandLength;
    for (++i; i < aStr.length; ++i) {
        var chr = aStr.charAt(i);
        if (opPos) {
            if ( (newPos = operatorList.indexOf(chr)) > 0 && newPos >= priority) {
                if (leftOperand = operation(operator,parse(aStr.substr(opPos + 1, rightOperandLength)), leftOperand))
                    formula[aStr.substr(0, i)] = leftOperand;
                else
                    return;
                opPos = i;
                operator = chr;
                priority = newPos;
            }
        } else if ((priority = operatorList.indexOf(chr)) > 0) {
            opPos = i;
            operator = chr;
        } 
    }


    if (opPos) {
        if (leftOperand = operation(operator, parse(aStr.substr(opPos + 1)), leftOperand))
            formula[aStr] = leftOperand;
        else
            return;
    }
    return leftOperand;
}
}
