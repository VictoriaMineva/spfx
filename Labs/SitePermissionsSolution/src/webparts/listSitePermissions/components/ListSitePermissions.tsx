import * as React from 'react';
import styles from './ListSitePermissions.module.scss';
import { IListSitePermissionsProps } from './IListSitePermissionsProps';
import { ISPRoleAssignment } from '../../../interfaces/PermissionInterfaces';
import PermissionsHttpService from '../../../services/PermissionsHttpService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import PermissionList from './Permissions/PermissionsList';
import GroupDetails from './Permissions/GroupDetails';

export interface IListSitePermissionsState {
  permissions: ISPRoleAssignment[];
  selectedRoleAssignment?: ISPRoleAssignment;
}

export default class ListSitePermissions extends React.Component<IListSitePermissionsProps, IListSitePermissionsState> {
  constructor(props: {context: IWebPartContext}) {
    super(props);

    //set initial state
    this.state = { permissions: []};

    //set service 
    this._permissionsHttpService = new PermissionsHttpService(this.props.context);
  }

  private _permissionsHttpService: PermissionsHttpService;

  public componentDidMount(): void {
    this._permissionsHttpService.GetRoleAssignmentData().then((roleAssignments: ISPRoleAssignment[]) => {
      console.log(roleAssignments);

      this.setState({
        permissions: roleAssignments
      });
    });
  }

  private handleRoleAssignmentSelect(roleAssignment: ISPRoleAssignment): void {
    console.log(roleAssignment);

    this.setState({
      selectedRoleAssignment: roleAssignment
    });
  }
  
  public render(): JSX.Element {
    return (
      <div className={ styles.listSitePermissions }>
        <div className={ styles.container }>
          <div className={ styles.row }>
              <PermissionList permissions={this.state.permissions} onRoleAssignmentSelect={(ra) => this.handleRoleAssignmentSelect(ra)} />
              <GroupDetails selectedRoleAssignment={this.state.selectedRoleAssignment} />
          </div>
        </div>
      </div>
    );
  }
}
