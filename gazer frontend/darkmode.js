var mode_checker = 0
function darkmodefn() { 
    if(mode_checker==0)
    {
        document.getElementById('stylesheet').href = 'dark.css';
        document.getElementById("navi").className = "navbar navbar-expand-lg navbar-dark bg-dark fixed-top";
        document.getElementById("darkmode").innerHTML = "Light Mode";
        mode_checker = 1;
    }
    else
    {
        document.getElementById('stylesheet').href = 'light.css';
        document.getElementById("navi").className = "navbar navbar-expand-lg navbar-light bg-light fixed-top";
        document.getElementById("darkmode").innerHTML = "Dark Mode";
        mode_checker = 0;
    }
}