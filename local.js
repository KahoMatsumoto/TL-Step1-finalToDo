$(loaded);

function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
    }
  );
  /*
  $("#checkBox").click(
    if ($("#checkBox").attr("checked")==="checked"){
      $("#checkBox").attr("checked","");
    } else {
      $("#checkBox").attr("checked","checked");
    }
  );
  */
}

// 入力された内容をローカルストレージに保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  var time = new Date();
  var val = text.val();
  // ボックスにチェックされているかどうか
  var isChecked = false;
  var datalist = [val, isChecked];
  // 入力チェックをしてからローカルストレージに保存する
  if(checkText(val)) {
    localStorage.setItem(time, JSON.stringify(datalist));
    // テキストボックスを空にする
    text.val("");
  }
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $("#list");
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value, html = [];
  // 古い順に表示
  /*
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
  */
  // 新しい順に表示
  for(var i = localStorage.length-1; i>=0; i--) {
    key = localStorage.key(i);
    value = JSON.parse(localStorage.getItem(key));
    // 表示する前にエスケープ
    var escTxt = escapeText(value[0]);
    var input = null;
    //チェックされているかどうか
    if (value[1]===true){
      input = "<input type=\"checkbox\" value=" + escTxt + " checked=\"checked\">";
    } else {
      input = "<input type=\"checkbox\" value=" + escTxt + ">";
    }
    html.push($("<p>").html(input + escTxt));
  }
  list.append(html);
}

function changeBox() {

}

// 文字をエスケープする
function escapeText(text) {
  var TABLE_FOR_ESCAPE_HTML = {
    "&": "&amp;",
    "\"": "&quot;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return text.replace(/[&"<>]/g, function(match) {
    return TABLE_FOR_ESCAPE_HTML[match];
  });
}

// 入力チェックを行う
function checkText(text) {
  // 文字数が0または20以上は不可
  if (0 === text.length || 20 < text.length) {
    alert("文字数は1〜20字にしてください");
    return false;
  }

  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  // すべてのチェックを通過できれば可
  return true;
}
