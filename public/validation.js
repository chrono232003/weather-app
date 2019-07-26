 window.addEventListener('load', function() {
   // Fetch all the forms we want to apply custom Bootstrap validation styles to
   var form = document.getElementById('randomCoors');
   // Loop over them and prevent submission
   form.addEventListener('submit', function(event) {
     event.preventDefault();
     event.stopPropagation();
     var numberOfCoords = document.getElementById('numberInput');
     if (numberOfCoords.value == 0 || numberOfCoords.value > 20) {
       alert("bad");
     } else {
       var mapBox = document.getElementById('mapbox');
       //mapBox.setAttribute('numberofcoords', numberOfCoords.value);
       // var numbOfCoordsElement = document.getElementById('numberOfCoords');
       // numbOfCoordsElement.setAttribute('numberofcoords', numberOfCoords.value);

       //document.getElementById('mapBoxWrapper').style.display= "block";

     }
   }, false);
 }, false);
