import * as React from 'react';
import styles from './Facilities.module.scss';
import { IFacilitiesProps } from './IFacilitiesProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { DetailsList, SelectionMode } from 'office-ui-fabric-react';

import Facility from './Facility';

export interface IFacilitiesState {
  items?: any;
  selectedItem?: any;
}

export default class Facilities extends React.Component<IFacilitiesProps, IFacilitiesState> {
  constructor(props: { description: string}) {
    super(props);
    var fData = require('../facilities.json');
    this.state = { items: fData };
  }

  private renderItemColumn(item, index, column) {
    const fieldContent = item[column.fieldName];
    switch (column.key) {
      case 'status':
          return <div style={{ backgroundColor: fieldContent, borderRadius: "16px", width: "16px", marginLeft: "6px" }}>&nbsp;</div>;
      default:
          return <span>{ fieldContent }</span>;
    }
  }

  public render(): React.ReactElement<IFacilitiesProps> {
    var facilities = this.state.items.map(
      (f) => <tr><td><b>{f.name}</b></td><td>{f.status}</td></tr>
    );
    return (
      <div className={ styles.facilities }>
        <div className="ms-font-su">{this.props.description}</div>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6">
              <DetailsList items={ this.state.items } 
                          selectionMode={ SelectionMode.single } 
                          columns={[
                            {
                              key: "status",
                              name: "Status",
                              fieldName: "status",
                              minWidth: 60
                            },
                            {
                              key: "name",
                              name: "Name",
                              fieldName: "name",
                              minWidth: 180
                            }
                          ]} 
                          onRenderItemColumn={ this.renderItemColumn } 
                          onActiveItemChanged={(item) => this.setState({ selectedItem: item })}/>
            </div>
            <div className="ms-Grid-col ms-u-sm6">
              <Facility item={this.state.selectedItem} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
