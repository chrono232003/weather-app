package weather;

import org.junit.Test;

public class WaterDataTest {

    @Test
    public void getWeatherResponse() {
        WeatherData weatherData = new WeatherData("5");
        String data = weatherData.retrieveWeatherData();
        System.out.println("This is the data: " + data);
        assert true;
    }

}
