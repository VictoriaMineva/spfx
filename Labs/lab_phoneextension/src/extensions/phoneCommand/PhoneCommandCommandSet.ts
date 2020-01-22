import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'PhoneCommandCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPhoneCommandCommandSetProperties {}

const LOG_SOURCE: string = 'PhoneCommandCommandSet';

export default class PhoneCommandCommandSet extends BaseListViewCommandSet<IPhoneCommandCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized PhoneCommandCommandSet');
    return Promise.resolve();
  }
  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const dialCommand: Command = this.tryGetCommand('DIAL');
    if (dialCommand) {
      // button should be visible if an item with a work phone is selected
      console.log(event.selectedRows);
      if(event.selectedRows.length === 1){
        let row = event.selectedRows[0];
        if(row.getValueByName("WorkPhone"))
          dialCommand.visible = true;
          return;
      }
      dialCommand.visible = false;
    }
  }
  

  @override
public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
  switch (event.itemId) {
    case 'DIAL':
      console.log(event.selectedRows[0]);
      let row = event.selectedRows[0];
      let phoneNumber = row.getValueByName("WorkPhone");
      window.open(`tel:${phoneNumber}`);
      break;
    default:
      throw new Error('Unknown command');
  }
}

}
