var list = ["Hello","Thank you","What's your name?","OK","Yes","No","Can you repeat that?","Great!"];
low = 0;
high = list.length;
mid = low + (high-low)/2;
mid = Math.floor(mid);
//this function is called when the main page is loaded.
function onloadmain(){
    createPhraseList(list, low, mid, high);
}

function detectArrowKey(event) { 

    key = event.keyCode;
    if(low == mid-1 && mid == high-1){  //when finally two phrases are left
        if (key == 37) 
        {   
            $("#leftlist").addClass("pressed");
            $(".left-arrow").attr('src','static/assets/left-arrow-selected.png');
            setTimeout(function() {
                alert("final: " + list[low]);
                $(".left-arrow").attr('src','static/assets/left-arrow.png');
                $("#leftlist").removeClass("pressed");
                resetParameters();
            }, 200);
            
        }
        if(key == 39)
        {
            $("#rightlist").addClass("pressed");
            $(".right-arrow").attr('src','static/assets/right-arrow-selected.png');
            setTimeout(function() {
                alert("final: " + list[mid]);
                $(".right-arrow").attr('src','static/assets/right-arrow.png');
                $("#rightlist").removeClass("pressed");
                resetParameters();
            }, 200);  
        }
        if (key == 38) { //if user press up key, refresh the page
            $("#snooze-section").addClass("pressed");
            $(".up-arrow").attr('src','static/assets/up-arrow-selected.png');
            setTimeout(function() {
                alert("Refreshing page");
                $(".up-arrow").attr('src','static/assets/up-arrow.png');
                $("#snooze-section").removeClass("pressed");
                resetParameters();
            }, 200);
            
        }
        return;
    }
    
    if (key == 37) 
    {  //if user press left key
        $("#leftlist").addClass("pressed");
        $(".left-arrow").attr('src','static/assets/left-arrow-selected.png');
        high = mid;
        mid = low + (high-low)/2;
        mid = Math.floor(mid);
        $(".phrase").remove();
        createPhraseList(list, low, mid, high);
        setTimeout(function() {
            $(".left-arrow").attr('src','static/assets/left-arrow.png');
            $("#leftlist").removeClass("pressed");
        }, 200);
    }

    else if (key == 39)
    { //if user press right key
        $("#rightlist").addClass("pressed");
        $(".right-arrow").attr('src','static/assets/right-arrow-selected.png');
        low = mid;
        mid = low + (high-low)/2;
        mid = Math.floor(mid);
        $(".phrase").remove();
        createPhraseList(list, low, mid, high);
        setTimeout(function() {
            $(".right-arrow").attr('src','static/assets/right-arrow.png');
            $("#rightlist").removeClass("pressed");
        }, 200);
    }

    else if (key == 38) { //if user press up key, refresh the page
        $("#snooze-section").addClass("pressed");
        $(".up-arrow").attr('src','static/assets/up-arrow-selected.png');
        setTimeout(function() {
            alert("Refreshing page");
            $(".up-arrow").attr('src','static/assets/up-arrow.png');
            $("#snooze-section").removeClass("pressed");
            resetParameters();
        }, 200);
        
    }
  }

function createPhraseList(list, low, mid, high) {
    var leftList = document.getElementById("leftlist");
    var rightList = document.getElementById("rightlist");

    for( var j=low ; j<mid ; j++)
    {
        var newLeftListItem = document.createElement("h2"); //create a h2 element
        newLeftListItem.classList.add("phrase");
        var leftListValue = document.createTextNode(list[j]); //create a text
        newLeftListItem.appendChild(leftListValue); //add the text into the h2 element
        leftList.append(newLeftListItem);
        leftList.append(document.createElement("br")); //add the br tag after the h2 closing tag 
    }

    for( var j = mid ; j<high ; j++)
    {
        var newRightListItem = document.createElement("h2"); //create a h2 element
        newRightListItem.classList.add("phrase"); 
        var rightListValue = document.createTextNode(list[j]); //create a text
        newRightListItem.appendChild(rightListValue); //add the text into the h2 element
        rightList.append(newRightListItem);
        rightList.append(document.createElement("br"));
    }
}

function resetParameters() { 
    $("#leftlist").empty()
    $("#rightlist").empty()
    low = 0;
    high = list.length;
    mid = low + (high-low)/2;
    mid = Math.floor(mid);
    createPhraseList(list, low, mid, high);
}

function resetParameters1() { 
    $("#leftlist").empty()
    $("#rightlist").empty()
    low = 0;
    high = list.length;
    mid = low + (high-low)/2;
    mid = Math.floor(mid);
    createPhraseList1(list, low, mid, high);
}

function createPhraseList1(list, low, mid, high) {
    var leftList = document.getElementById("leftlist");
    var rightList = document.getElementById("rightlist");

    for( var j=low ; j<mid ; j++)
    {
        var newLeftListItem = document.createElement("h2"); //create a h2 element
        newLeftListItem.classList.add(""+j);
        var btn=document.createElement("INPUT");
        btn.setAttribute("type","checkbox");
        btn.classList.add("closed");
        btn.innerHTML='  &times;';
        var leftListValue = document.createTextNode(list[j]); //create a text
        newLeftListItem.appendChild(leftListValue); //add the text into the h2 element
        leftList.append(newLeftListItem);
        newLeftListItem.appendChild(btn);
        leftList.append(document.createElement("br")); //add the br tag after the h2 closing tag 
    }

    for( var j = mid ; j<high ; j++)
    {
        var newRightListItem = document.createElement("h2"); //create a h2 element
        newRightListItem.classList.add(""+j);
        var btn=document.createElement("INPUT");
        btn.setAttribute("type","checkbox");
        btn.classList.add("closed");
        btn.innerHTML='  &times;'; 
        var rightListValue = document.createTextNode(list[j]); //create a text
        newRightListItem.appendChild(rightListValue); //add the text into the h2 element
        rightList.append(newRightListItem);
        newRightListItem.appendChild(btn);
        rightList.append(document.createElement("br"));
    }
}
var remove_arr=[]
//function called when user cicks on delete phrase button
function deleteit(){
    //TODO:yaha aisa code likhna jo delete kar dega database me and code nhi ata flask ka
    // console.log(remove_arr)
    // for(var j=0;j<remove_arr.length;j++){
    // for(var i=0;i<list.length;i++){
    //         list.splice(remove_arr[j], 1);
    // }}
    // resetParameters1();
    console.log(remove_arr);
}
//this function is called when the edit.html is loaded
function edit(){
    createPhraseList1(list, low, mid, high);
    
    var i;
    //this function will remove the element from the list
    for(var i=0;i<document.querySelectorAll(".closed").length;i++){
        document.querySelectorAll(".closed")[i].addEventListener("change",function (){
            if(this.checked)
                {var j=parseInt(this.parentElement.className)
                remove_arr.push(j)}
            else{
                for( var i = 0; i < remove_arr.length; i++){ 
                                   
                    if ( remove_arr[i] === parseInt(this.parentElement.className) ) { 
                        remove_arr.splice(i, 1); 
                        i--; 
                    }
                }
            }
        });
    }
}

function add_element() { 
    var x= document.getElementById("myText").value
    list.push(x);       
    //TODO:update x to database
    resetParameters1();
    } 