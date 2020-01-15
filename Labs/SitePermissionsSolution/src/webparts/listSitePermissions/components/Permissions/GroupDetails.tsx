import * as React from 'react';

import { css } from 'office-ui-fabric-react';
import styles from '../ListSitePermissions.module.scss';

import { ISPUser, ISPRoleAssignment } from '../../../../interfaces/PermissionInterfaces';

export interface IGroupDetailsProps {
    selectedRoleAssignment?: ISPRoleAssignment;
}

export default class GroupDetails extends React.Component<IGroupDetailsProps, {}> {
    public render(): React.ReactElement<IGroupDetailsProps> {
        if(!this.props.selectedRoleAssignment || !this.props.selectedRoleAssignment.Member.Users) {
            return <div />;
        } else {
            var users = this.props.selectedRoleAssignment.Member.Users.map((user: ISPUser) =>
                <div className={css('ms-Grid-col ms-u-sm11 ms-u-md3 ms-bgColor-themePrimary', styles.element)} key={user.Title}>{user.Title}</div>
            );

            return (
                <div className="ms-Grid ms-fontColor-white">
                    <div className="ms-Grid-row ms-u-sm11 ms-font-xl ms-fontColor-themePrimary">Group Members</div>
                    <div className="ms-Grid-row">
                        {users}
                    </div>
                </div>
            )
        }
    }
}