var myNodelist = document.getElementsByTagName("li");
var i;
for (i=0; i<myNodelist.length; i++){
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);

}

var clos = document.getElementsByClassName("close");
var i;
for (i=0; i<clos.length; i++){
    clos[i].onclick = function(){
        var div = this.parentElement;
        div.style.display = "none";
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function newElement(){
    var li = document.createElement("LI");
    var inputvalue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputvalue);
    li.appendChild(t);
    if (inputvalue === " "){
        alert("You must write something");
    } else{
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = " ";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    var i;
    for (i=0; i<clos.length; i++){
        clos[i].onclick = function(){
        var div = this.parentElement;
        div.style.display = "none";
        }
    }

}

function onkeypres(ev){
    if(ev.keyCode===13){
        newElement();
    }
}

var inp = document.getElementById("myInput");
inp.addEventListener("keypress", onkeypres);