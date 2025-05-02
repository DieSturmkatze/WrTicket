function switchPanel(panel){
    document.getElementById("panel").innerHTML = panel;

    document.querySelectorAll(".panel1").forEach(function(p){
        p.classList.add("hidden");
    });
    document.getElementById(panel).classList.remove("hidden");
}