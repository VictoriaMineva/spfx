import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';

import styles from './SassWpWebPart.module.scss';
import * as strings from 'SassWpWebPartStrings';

export interface ISassWpWebPartProps {
  description: string;
}

export default class SassWpWebPart extends BaseClientSideWebPart <ISassWpWebPartProps> {
  private sites: any = [];

  protected onInit(): Promise<void> {
    return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/webs/?$select=Title,ServerRelativeUrl,SiteLogoUrl,WebTemplate`, SPHttpClient.configurations.v1)
    .then((data) => data.json())
    .then((jsonData) => {
      this.sites = jsonData.value;
      console.log(this.sites);
      return Promise.resolve();
    });
  }

  public render(): void {
    let siteData = this.sites.map((s) => `
      <div class="${styles.site}">
        <div class="${styles.logo}" ${s.SiteLogoUrl ? "style='background-image:url(" + s.SiteLogoUrl + ");'": ""}>&nbsp;</div>
        <div class="${styles.title}">
          ${s.Title}
        </div>
        <div class="${styles.subtitle}">
          ${s.WebTemplate}
        </div>
      </div>
    `);

    this.domElement.innerHTML = `
      <div class="${ styles.sassWp }">
        <div class="${ styles.container }">
          <div class="${styles.sites}">
            ${siteData.join('')}
          </div>
          <div class="${styles.clearfix}"></div>
        </div>
      </div>`;
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
