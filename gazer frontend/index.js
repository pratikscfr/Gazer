var list = ["Hello","Thank you","What's your name?","OK","Yes","No","Can you repeat that?","Great!"];
low = 0;
high = list.length;
mid = low + (high-low)/2;
mid = Math.floor(mid);
createPhraseList(list, low, mid, high);

function detectArrowKey(event) { 

    key = event.keyCode;
    if(low == mid-1 && mid == high-1){  //when finally two phrases are left
        if (key == 37) 
        {   
            $("#leftlist").addClass("pressed");
            setTimeout(function() {
                alert("final: " + list[low]);
                $("#leftlist").removeClass("pressed");
                resetParameters();
            }, 200);
            
        }
        if(key == 39)
        {
            $("#rightlist").addClass("pressed");
            setTimeout(function() {
                alert("final: " + list[mid]);
                $("#rightlist").removeClass("pressed");
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
        $("#leftlist").addClass("pressed");
        high = mid;
        mid = low + (high-low)/2;
        mid = Math.floor(mid);
        $(".phrase").remove();
        createPhraseList(list, low, mid, high);
        setTimeout(function() {
            $("#leftlist").removeClass("pressed");
        }, 200);
    }

    else if (key == 39)
    { //if user press right key
        $("#rightlist").addClass("pressed");
        low = mid;
        mid = low + (high-low)/2;
        mid = Math.floor(mid);
        $(".phrase").remove();
        createPhraseList(list, low, mid, high);
        setTimeout(function() {
            $("#rightlist").removeClass("pressed");
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

