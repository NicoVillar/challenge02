const adicionar = document.querySelector('#agregar');
adicionar.addEventListener("click", function(capturar){
    capturar.preventDefault();
    var txt = document.getElementById("palabra").value;
    var txt = txt;

    if(txt.length === 0 | /^\s$/.test(txt)){
        alert("escribe una palabra");
    }
    else if(/[^A-Z]/.test(txt)){
        alert("Solo palabras mayusculas y sin tilde");
    }
    else{
        alert("Guardado");
        localStorage.setItem("storage",txt);
    }

})