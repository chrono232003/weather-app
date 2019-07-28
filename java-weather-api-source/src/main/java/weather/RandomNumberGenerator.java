package weather;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;

public class RandomNumberGenerator {

    int numberOfCoords;

    public RandomNumberGenerator(int numberOfCoords) {
        this.numberOfCoords = numberOfCoords;
    }

    /**
     * Take the random lat and random longs and create an Array of coord arrays
     * @param numberOfCoords
     */
    public ArrayList<ArrayList> getRandomCoords() {

        ArrayList randomCoords = new ArrayList();

        ArrayList lats = getRandomLats();
        ArrayList lons = getRandomLons();

        for (int i=0; i<numberOfCoords; i++) {
            ArrayList coord = new ArrayList();
            coord.add(lats.get(i));
            coord.add(lons.get(i));
            randomCoords.add(coord);
        }

        return randomCoords;
    }

    /**
     * Get the requested number of lat coords
     * @return
     */
    ArrayList<Integer> getRandomLats() {
        String integers = baseRest(-90, 90);
        System.out.println("this is the response: " + integers);
        String[] list = integers.split(",");

        return new ArrayList( Arrays.asList( list ) );
    }

    /**
     * Get the requested number of lon coords
     * @return
     */
    ArrayList<Integer> getRandomLons() {
            String integers = baseRest(-180,180);
            String[] list = integers.split(",");
            return new ArrayList( Arrays.asList( list ) );
    }

    private String baseRest(int min, int max) {

        StringBuilder response = new StringBuilder();

        try {
            System.out.print("num: " +  numberOfCoords + " min " + min + " max " + max);
            String endpoint = "https://www.random.org/integers/?num="+numberOfCoords+"&min="+min+"&max="+max+"&col=1&base=10&format=plain&rnd=new";
            //String endpoint = "https://www.random.org/integers/?num=5&min=-90&max=90&col=1&base=10&format=plain&rnd=new";
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
                System.out.println(output);
                response.append(output + ",");
            }

            conn.disconnect();


        } catch (MalformedURLException e) {

            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        }

        return response.toString();
    }
}
