import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { MSGraphClient } from "@microsoft/sp-http";

export default class MSGraphService {
    private _groupId = null;
    private msGraphClient: MSGraphClient;

    constructor(public context: ApplicationCustomizerContext) {
        this._groupId = context.pageContext.legacyPageContext.groupId;
    }

    private getGraphClient(): Promise<any> {
        return this.context.msGraphClientFactory.getClient().then(
            client => {
                this.msGraphClient = client;
                return Promise.resolve();
            }
        ).catch(e => {
            console.log(e);
            return Promise.reject(e);
        });
    }

    public getLatestThreadPost(): Promise<MicrosoftGraph.ConversationThread>{
        return this.getGraphClient().then(() =>
            this.msGraphClient.api(`/groups/${this._groupId}/threads`)
                                .select("id,topic,lastDeliveredDateTime")
                                .top(1)
                                .expand("posts($select=from,body,receivedDateTime)")
                                .get()
        )
        .then(
            r => r.value[0],
            e => console.log(e)
        );
    }
}