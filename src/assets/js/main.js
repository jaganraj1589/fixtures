
var arr = [];
var enterPlayer = document.getElementById('enterplayer')
var listGrp = document.querySelector('.teams');
enterPlayer.addEventListener('click', function(){
    var player = document.getElementById('players').value.trim();
    if (player != '' && isValid (player)) {
        arr.push(player);
        addToList(player);
// console.log(arr);
        document.getElementById('players').value = ''
    }
})

var addToList = function(player) {
    var playerList = document.createElement("LI");
    var playerListedit = document.createElement("input");
    var playerListin = document.createElement("SPAN");                 
    var textnode = document.createTextNode(player);
    playerListin.appendChild(textnode);
    playerList.appendChild(playerListedit);  
    playerList.appendChild(playerListin);                           
    playerList.innerHTML += ' <a href="#" class="listDelete">Delete</a>  <a href="#" class="listEdit">Edit</a> <a href="#" class="listSave">save</a>'
    listGrp.appendChild(playerList);
    playerList.querySelector('.listDelete').addEventListener('click', listDelete)
    playerList.querySelector('.listEdit').addEventListener('click', listEdit)
    playerList.querySelector('.listSave').addEventListener('click', listSave)    
}

var isValid = function(player) {
    var found = arr.find(function(element) {
        return element == player;
    });    
    return ! (found)
}
 
var listDelete = function(e) {
    e.preventDefault();
    var removetext = e.target.parentNode.querySelector('span').textContent
    e.target.parentNode.remove();        
    var index = arr.indexOf(removetext);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

var listEdit = function (e) {
    e.preventDefault();
    let editText = e.target.parentNode.querySelector('span').textContent
    let editMode = e.target.parentNode.querySelector('.teams input')
    editMode.value = editText
    e.target.parentNode.classList.add("edit");
}

var listSave = function (e) {
    e.preventDefault();    
    let newText = e.target.parentNode.querySelector('.teams input').value
    let editText = e.target.parentNode.querySelector('span')
    const oldText = editText.textContent
    editText.textContent = newText
    e.target.parentNode.classList.remove("edit");
    let index = arr.indexOf(oldText);
    if (index >= -1) {
        arr[index] = newText
    }
}




var shuffle = function(e) {
    e.preventDefault();
    try{
        if(arr.length < 4){
            throw new Error('No of teams should be more than 4')
        }

        if (arr.length % 2 != 0){
            throw new Error('No of teams should be in even')
        }
        document.querySelector('#error').innerHTML = ""
        var shuufleTeam = arr.sort(function(a, b){return 0.5 - Math.random()});
        function separateIt(shuufleTeam, size) {
            var newArr = [];
            for (var i = 0; i < shuufleTeam.length; i += size) {
                var sliceIt = shuufleTeam.slice(i, i + size);
                newArr.push(sliceIt);
            }
            return newArr;
        }
        var fix = (separateIt(shuufleTeam, 2));
        // var shuuflefix = fix.sort(function(a, b){return 0.5 - Math.random()});
        // var double = (separateIt(shuuflefix, 2));
// console.log(double)
        document.querySelector('#fixture').innerHTML = ""  
        fix.forEach( fixs =>{
            var teamA = fixs[0]
            var teamB = fixs[1]
            var listTeam = document.querySelector('#fixture')
            listTeam.innerHTML += "<li><span>" +teamA+ "</span> <i> VS </i> <span>" +teamB+ "</span> </li>"
        } );
    }
    catch(e){
        document.querySelector('#error').innerHTML = e.message
    }
                  
}

document.querySelector('#generate').addEventListener('click', shuffle);




