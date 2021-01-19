var list = ["a","b","c","d","e","f","g","h"];
low = 0;
high = list.length;
mid = low + (high-low)/2;
mid = Math.floor(mid);
createPhraseList(list, low, mid, high);

function detectArrowKey(event) { 

    key = event.keyCode;
    var myElement = document.querySelector('#my-element');
    if(low == mid-1 && mid == high-1){  //when finally two phrases are left
        if (key == 37) 
        {   
            $("#left-section").addClass("pressed");
            setTimeout(function() {
                alert("final: " + list[low]);
                $("#left-section").removeClass("pressed");
                resetParameters();
            }, 200);
            
        }
        if(key == 39)
        {
            $("#right-section").addClass("pressed");
            setTimeout(function() {
                alert("final: " + list[mid]);
                $("#right-section").removeClass("pressed");
                resetParameters();
            }, 200);  
        }
        if (key == 38) { //if user press up key, refresh the page
            $("#snooze-section").addClass("pressed");
            setTimeout(function() {
                alert("Refreshing page");
                $("#snooze-section").removeClass("pressed");
                resetParameters();
            }, 200);
            
        }
        return;
    }
    
    if (key == 37) 
    {  //if user press left key
        $("#left-section").addClass("pressed");
        high = mid;
        mid = low + (high-low)/2;
        mid = Math.floor(mid);
        $(".phrase").remove();
        createPhraseList(list, low, mid, high);
        setTimeout(function() {
            $("#left-section").removeClass("pressed");
        }, 200);
    }

    else if (key == 39)
    { //if user press right key
        $("#right-section").addClass("pressed");
        low = mid;
        mid = low + (high-low)/2;
        mid = Math.floor(mid);
        $(".phrase").remove();
        createPhraseList(list, low, mid, high);
        setTimeout(function() {
            $("#right-section").removeClass("pressed");
        }, 200);
    }

    else if (key == 38) { //if user press up key, refresh the page
        $("#snooze-section").addClass("pressed");
        setTimeout(function() {
            alert("Refreshing page");
            $("#snooze-section").removeClass("pressed");
            resetParameters();
        }, 200);
        
    }
  }

function createPhraseList(list, low, mid, high) {
    var leftlist = document.getElementById("leftlist");
    var rightlist = document.getElementById("rightlist");

    for( var j=low ; j<mid ; j++)
    {
        var newLeftListItem = document.createElement("li"); //create a li element
        newLeftListItem.classList.add("phrase");
        var leftListValue = document.createTextNode(list[j]); //create a text
        newLeftListItem.appendChild(leftListValue) //add the text into the li element
        leftlist.appendChild(newLeftListItem);        
    }

    for( var j = mid ; j<high ; j++)
    {
        var newRightListItem = document.createElement("li"); //create a li element
        newRightListItem.classList.add("phrase"); // add class "phrase" to the li element
        var rightListValue = document.createTextNode(list[j]); //create a text
        newRightListItem.appendChild(rightListValue) //add the text into the li element
        rightlist.appendChild(newRightListItem);
    }
}

function resetParameters() { 
    $(".phrase").remove();
    low = 0;
    high = list.length;
    mid = low + (high-low)/2;
    mid = Math.floor(mid);
    createPhraseList(list, low, mid, high);
}

