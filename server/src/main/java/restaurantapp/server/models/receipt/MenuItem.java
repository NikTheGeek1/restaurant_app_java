package restaurantapp.server.models.receipt;

public enum MenuItem {
    TOMATO_SOUP(4),
    MUSHROOM_SOUP(4),
    VEGETABLE_SOUP(4),
    RASAM_SOUP(2.5),

    FRIED_IDLY(5.5),
    SPECIAL_MASALA_IDLY(6),
    UPMA(5.5),
    MASALA_UPMA(6),
    SAMOSA(6),
    GREEN_SALAD(4),

    LEMON_RICE(6.5),
    PLAIN_RICE(3),
    TOMATO_RICE(6.5),
    DAL_RICE(6),
    MUSHROOM_BIRIYANI(8),

    POORI(3),
    POORI_CHANNA_MASALA(7),

    VEGETABLE_NOODLES(60),
    FRIED_NOODLES(70),

    JUICE(3.5),
    WATER(3.5),
    LEMON_SODA(35),

    BEVERAGE(2),
    BEER(3.5);

    public final double price;

    MenuItem(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}
