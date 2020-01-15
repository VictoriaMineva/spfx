import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ListSitePermissions from './components/ListSitePermissions';
import { IListSitePermissionsProps } from './components/IListSitePermissionsProps';

export interface IListSitePermissionsWebPartProps {}

export default class ListSitePermissionsWebPart extends BaseClientSideWebPart <IListSitePermissionsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListSitePermissionsProps> = React.createElement(
      ListSitePermissions,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
