import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, 
        IPropertyPaneConfiguration, 
        PropertyPaneDropdown, 
        PropertyPaneSlider,
        IPropertyPaneDropdownOption } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { ISPList } from '../../interfaces/ISPList';
import { ISPListItem } from '../../interfaces/ISPListItem';
import { ISPDataService } from '../../interfaces/ISPDataService';
import MockDataService from '../../services/MockDataService';
import SharePointDataService from '../../services/SharePointDataService';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

import styles from './ListDataWebPart.module.scss';
import * as strings from 'ListDataWebPartStrings';

export interface IListDataWebPartProps {
  ListID: string;
  MaxItems: number;
}

export default class ListDataWebPart extends BaseClientSideWebPart <IListDataWebPartProps> {
  private _listDropDownOptions: IPropertyPaneDropdownOption[] = [];

  protected onInit(): Promise<void> {
    this.getLists()
      .then((listData) => {
        this._listDropDownOptions = this.getListDropdownOptions(listData);
      });

      return Promise.resolve<void>();
  }

  private _dataService: ISPDataService;
  private get DataService(): ISPDataService {
    if(!this._dataService) {
      if (Environment.type in [EnvironmentType.Local, EnvironmentType.Test]) {
        this._dataService = new MockDataService();
      } else {
        this._dataService = new SharePointDataService(this.context);
      }
    }

    return this._dataService;
  }

  private getLists(): Promise<ISPList[]> {
    return this.DataService.getLists();
  }

  private getListDropdownOptions(listData: ISPList[]): IPropertyPaneDropdownOption[] {
    var ddOptions: IPropertyPaneDropdownOption[] = [];
    listData.forEach((value) => {
      ddOptions.push({key: value.id, text: value.name});
    });

    return ddOptions;
  }

  private loadListItems() {
    this.DataService
    .getListItems(this.properties.ListID, this.properties.MaxItems)
    .then((listItemData: ISPListItem[]) => {
      this.renderListItems(listItemData);
    });
  }

  private renderListItems(listItemData: ISPListItem[]) {
    var html: string = '';
    listItemData.forEach((item: ISPListItem) => {
      html += `
        <div class="${styles.listItem}">
          <span class="ms-font-1">${item.id}</span>
          &nbsp;-&nbsp;
          <span class="ms-font-1">${item.title}</span>
        </div>
      `;
    });

    const listContainer: Element = this.domElement.querySelector('#spListItemContainer');
    listContainer.innerHTML = html;
  }

  // private getLists(): ISPList[] {
  //   let dataService = new MockDataService();
  //   let listData: ISPList[] = dataService.getLists();
    
  //   return listData;
  // }

  // private getListDropdownOptions(): IPropertyPaneDropdownOption[] {
  //   var listData: ISPList[] = this.getLists();
  //   var ddOptions: IPropertyPaneDropdownOption[] = [];
  //   listData.forEach((value) => {
  //     ddOptions.push({key: value.id, text: value.name});
  //   });

  //   return ddOptions; 
  // }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.listData }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <div id="spListItemContainer"></div>
            </div>
          </div>
        </div>
      </div>`;

      this.loadListItems();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    this.loadListItems();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPanelListName
        },
        groups: [
          {
            groupName: strings.ListGroupName,
            groupFields: [
              PropertyPaneDropdown('ListID', {
                label: strings.ListNamePropertyLabel,
                options: this._listDropDownOptions
              }),
              PropertyPaneSlider('MaxItems', {
                label: strings.MaxItemsPropertyLabel,
                min: 0,
                max: 20
              })
            ]
          }
        ]
      }
    ]
  };
}
}
