import * as React from 'react';
import { DocumentCard, DocumentCardPreview, DocumentCardActivity, DocumentCardTitle } from 'office-ui-fabric-react';

export interface IFacilityProps {
    item?: any;
}

export default class Facility extends React.Component<IFacilityProps, {}> {
    private _blobUrl = 'https://spfxlabs.blob.core.windows.net/ouif/';

    public render(): JSX.Element {
        var imgSrc = this.props.item ? [{
            previewImageSrc: `${this._blobUrl}${this.props.item.name.toLowerCase()}.jpg`
        }]: [];

        var ppl = this.props.item ? [{
            name: this.props.item.facilitiesManagerName, 
            profileImageSrc: `${this._blobUrl}avatar-${this.props.item.facilitiesManagerAlias}.jpg`
        }]: [];
        return (
            <DocumentCard>
                <DocumentCardTitle title={this.props.item ? this.props.item.name : ''} />
                <DocumentCardPreview previewImages={imgSrc} />
                <DocumentCardActivity activity='Facility Manager' people={ppl} />
            </DocumentCard>
        );
    }
}