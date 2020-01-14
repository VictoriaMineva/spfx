import {Category} from '../code/category';
import {Product} from '../code/product';

export namespace DummyData {
    export let categories: Array<Category> = [
        new Category(1, 'Sports', 'Everything a kid needs to play outside'),
        new Category(2, 'Boardgames & Puzzles', 'Everything a kid needs to play inside'),
        new Category(3, 'Dolls', 'Everything a kid needs to play anywhere')
    ];

    categories[0].products = [
        new Product(1, "Skateboard", 49.95, "it's a skateboard"),
        new Product(2, "Waveboard", 69.95, "it's a waveboard"),
        new Product(3, "Longboard", 119.95, "it's a longboard")
    ];

    categories[1].products = [
        new Product(1, "Checkers", 49.95, "it's a checkersboard"),
        new Product(2, "Taj Mahal, 1000 pieces", 69.95, "it's a puzzle")
    ];

    categories[2].products = [
        new Product(1, "Barbie", 49.95, "it's Barbie!"),
        new Product(2, "Kenn", 69.95, "it's Kenn!"),
        new Product(3, "Furby", 119.95, "it's Furby!")
    ];
}