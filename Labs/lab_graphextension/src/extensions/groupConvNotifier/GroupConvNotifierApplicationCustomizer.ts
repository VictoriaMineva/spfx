import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GroupConvNotifierApplicationCustomizerStrings';
import MSGraphService from "../../services/MSGraphService";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

import styles from './GroupConvNotifier.module.scss';
 
const LOG_SOURCE: string = 'GroupConvNotifierApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGroupConvNotifierApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GroupConvNotifierApplicationCustomizer
  extends BaseApplicationCustomizer<IGroupConvNotifierApplicationCustomizerProperties> {

    private _graphService: MSGraphService;
    private _latestThreadData: MicrosoftGraph.ConversationThread;
    private _headerPlaceholder: PlaceholderContent;

  @override
  public onInit(): Promise<void> {
    this._graphService = new MSGraphService(this.context);
    return new Promise<void>((resolve, reject) => {
      this._graphService.getLatestThreadPost()
      .then((postData) => {
        this._latestThreadData = postData;
        this.renderHeader();
        resolve();
      })
      .catch(e => console.log(e));
    });
  }

  private renderHeader(): void {
    console.log("Rendering header!");

    if(!this._headerPlaceholder) {
      this._headerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {
        onDispose: this._onDispose
      });
    }

    if(!this._headerPlaceholder) {
      console.error("The expected placeholder (PageHeader) was not found.");
      return;
    }

    if(this._latestThreadData) {
      let lastPost: MicrosoftGraph.Post = this._latestThreadData.posts[
        this._latestThreadData.posts.length - 1
      ];
      if(this._headerPlaceholder.domElement) {
        this._headerPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="ms-bgColor-themeTertiary ms-fontColor-white ${styles.header}">
              <i class="ms-Icon ms-Icon--Info"></i>
              &nbsp;${this._latestThreadData.topic}
              &nbsp;<i class="ms-Icon ms-Icon--Contact"></i>
              &nbsp;${lastPost.from.emailAddress.name}
              &nbsp;<i class="ms-Icon ms-Icon--Message"></i>
              &nbsp;${this.parseContent(lastPost.body.content)}
            </div>
          </div>
        `;
      }
    }
  }

  private _onDispose(): void {
    console.log('Disposed header.');
  }

  private parseContent(content: string): string {
    let regex = /(<([^>]+)>)/ig;
    content = content.replace(regex, "");
    if(content.length > 200) content = content.slice(0, 200);
    return content;
  }
}
