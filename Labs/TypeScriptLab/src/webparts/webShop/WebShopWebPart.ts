import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from 'jquery';

import styles from './WebShopWebPart.module.scss';
import * as strings from 'WebShopWebPartStrings';

import {ToyStore} from '../../code/shoppingcart';
import {DummyData} from '../../data/dummydata';
import {Product} from '../../code/product';
import {Category} from '../../code/category';

export interface IWebShopWebPartProps {
  description: string;
}

export default class WebShopWebPart extends BaseClientSideWebPart <IWebShopWebPartProps> {
  private cart: ToyStore.ShoppingCart = new ToyStore.ShoppingCart();
  private selectedCategory: Category = null;
  private selectedProduct: Product = null;

  private categories: Array<Category> = DummyData.categories;

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.row }">
        <section>
          <h1>Select your products</h1>
          <select id="categories"></select>
          <select id="products"></select>
          amount: 
          <input id="quantity" type="number" value="1" />
          <input id="add" type="button" value="add to cart" />
        </section>
        <section>
          <h1>Cart</h1>
          <table id="cartTable">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              <tr>
            </thead>
            <tbody></tbody>
            <tfoot>
              <tr>
                <td colspan='2'>Total</td>
                <td id="cartTotalPrice"></td>
              </tr>
            </tfoot>
          </table>
        </section>
      </div>`;

    this.initForm();
  }

  private initForm(): void {
    this.loadCategories();
    this.loadSubCategories();
    this.addHandlers();
    this.renderCart();
    this.renderCartTotal();
  }

  private loadCategories(): void {
    var catSelect: JQuery = $("#categories");
    catSelect.append(
      this.categories.map((c) =>
        $("<option>").text(c.name).val(c.id.toString())
      )
    );
  }

  private loadSubCategories(): void {
    var prodSelect: JQuery = $("#products"),
        catIndex: any = $("#categories").val();

    this.selectedCategory = DummyData.categories.filter((c) => c.id == catIndex)[0];

    prodSelect.empty();
    prodSelect.append(
      this.selectedCategory.products.map((p) => 
      $("<option>").text(p.name).val(p.id.toString())
      )
    );
  }

  private addProductToCart(): void {
    var quantity: any,
        prodIndex: any;
      
    quantity = $("#quantity").val();
    prodIndex = $("#products").val();
    this.selectedProduct = this.selectedCategory.products.filter((p) => p.id == prodIndex)[0];

    this.cart.addItem(this.selectedProduct, quantity);
    this.renderCart();
    this.renderCartTotal();
  }

  private renderCart(): void {
    var tbody$: JQuery = $("#cartTable tbody");
    tbody$.empty();
    tbody$.append(
      this.cart.items.map((i) =>
        $("<tr>")
          .append($("<td>").text(i.product.name))
          .append($("<td>").text(i.quantity))
          .append($("<td>").text(i.product.price * i.quantity))
      )
    );
  }

  private renderCartTotal(): void {
    let totalPrice = 0;
    this.cart.items.map((i) => totalPrice += i.product.price);
    $("#cartTotalPrice").text(totalPrice);
  }

  private addHandlers(): void {
    $("#add").click(() => this.addProductToCart());
    $("#categories").change(() => this.loadSubCategories());
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
