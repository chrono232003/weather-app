export default class GetCoordinates {

  getRandomLatUtil() {
    return this.getRandomCoordinatesUtil(-90, 90, 2)
  }

  getRandomLongUtil() {
    return this.getRandomCoordinatesUtil(-180, 180, 2)
  }

   getRandomCoordinatesUtil(from, to, fixed) {
      return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
   }

   getRandomLatLongCoords(numberOfCoords) {
      var coordsWrap = [];
      for(var i=-0; i< numberOfCoords; i++) {
     		var coord = [];
        coord.push(this.getRandomLatUtil());
        coord.push(this.getRandomLongUtil());
        coordsWrap.push(coord);
      }
      return coordsWrap;
   }
}
