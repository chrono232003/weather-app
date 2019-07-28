package weather;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

public class WeatherData {


    private final int numberOfCoords;

    public WeatherData(String numberOfCoords) {
        this.numberOfCoords = Integer.parseInt(numberOfCoords);
    }

    public String retrieveWeatherData() {

        ArrayList responseList = new ArrayList();
        //StringBuilder responseList = new StringBuilder();

        //get coord array of arrays
        ArrayList<ArrayList> coordList = getCoords(numberOfCoords);

        for (int i=0; i<numberOfCoords; i++) {
            String lat = (String) coordList.get(i).get(0);
            String lon = (String) coordList.get(i).get(1);
            String response = weatherApiCall(lat, lon);
            responseList.add(response);
        }
        return responseList.toString();
    }

    private ArrayList<ArrayList> getCoords(int numberOfCoords) {
        RandomNumberGenerator generator = new RandomNumberGenerator(numberOfCoords);
        ArrayList<ArrayList> responseList = generator.getRandomCoords();
        return responseList;
    }

    String weatherApiCall(String lat, String lon) {
        //loop through the array and get data for each coord set
        String response = null;

        try {
            String endpoint = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid=3ec059ce7ec49481a8fdc9217305b06a";
            URL url = new URL(endpoint);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream())));

            String output;
            while ((output = br.readLine()) != null) {
                response = output;
            }

            conn.disconnect();


        } catch (MalformedURLException e) {

            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        }

        return response;
    }
}
