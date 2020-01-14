import { ISPList } from '../interfaces/ISPList';
import { ISPDataService } from '../interfaces/ISPDataService';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class SharePointDataService implements ISPDataService {
    constructor(public context: IWebPartContext) {

    }

    public getLists(): Promise<ISPList[]> {
        let requestUrl: string = 
            this.context.pageContext.web.absoluteUrl + 
            '/_apli/web/lists?filter=Hidden eq false and BaseType eq 0&$select=id,title';
            
        return this.context.spHttpClient
        .get(requestUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => response.json())
        .then((jsonData: any) => {
            return jsonData.value.map((element) => {
                return { id: element.Id, name: element.Title };
            });
        })
        .catch((error) => {
            console.log("Something went wrong!");
            console.log(error);
            return [];
        });
    }
}