package weather;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;

@RestController
public class WeatherController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value="/weatherdata", method = RequestMethod.GET)
    //public String test(@RequestParam("lat") String lat, @RequestParam("lon") String lon, @RequestParam("numberofcoords") String numberOfCoords) {
    public String getWeather(@RequestParam("numberofcoords") String numberOfCoords) {
        WeatherData data = new WeatherData(numberOfCoords);
        return data.retrieveWeatherData();
    }
}
