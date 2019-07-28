package weather;

import org.junit.Test;

import java.util.ArrayList;

public class RandomNumberGeneratorTest {

    @Test
    public void getRandLats() {
        RandomNumberGenerator gen = new RandomNumberGenerator(5);
        ArrayList data = gen.getRandomLats();
        assert data.size() == 5;
    }

    @Test
    public void getRandLons() {
        RandomNumberGenerator gen = new RandomNumberGenerator(5);
        ArrayList data = gen.getRandomLons();
        assert data.size() == 5;
    }

    @Test
    public void getRandCoords() {
        RandomNumberGenerator gen = new RandomNumberGenerator(5);
        ArrayList data = gen.getRandomCoords();
        System.out.println(data);
        assert data.size() == 5;
    }
}
