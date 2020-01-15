import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import styles from '../ListSitePermissions.module.scss';

import { ISPRoleAssignment, MemberType } from '../../../../interfaces/PermissionInterfaces';

export interface IPermissionListProps {
    permissions: ISPRoleAssignment[];
    onRoleAssignmentSelect?: any;
}

export default class PermissionList extends React.Component<IPermissionListProps, {}> {
    private selectRoleAssignment(role: ISPRoleAssignment, event): void {
        this.props.onRoleAssignmentSelect(role);
    }
    public render(): React.ReactElement<IPermissionListProps> {
        var roles = this.props.permissions.map((roleAss:ISPRoleAssignment) => {
           var roleBindingsHTML = roleAss.RoleDefinitionBindings.map(element =>
                <span className={styles.inline} key={element.Id}>{element.Name}</span>
            );

            return (
                <div className={css('ms-Grid-row', styles.row)} role="row" key={roleAss.PrincipalId} onClick={this.selectRoleAssignment.bind(this, roleAss)}>
                    <div className={css('ms-Grid-col ms-u-sm11 ms-u-lg5 ms-bgColor-themePrimary', styles.element)}>
                        <i className={css(`ms-Icon ms-Icon--${roleAss.Member.PrincipalType === MemberType.User ? 'Contact': 'Group'}`, styles.icon)}></i>
                        {roleAss.Member.Title}
                    </div>
                    <div className={css('ms-Grid-col ms-u-sm11 ms-u-lg6 ms-bgColor-themePrimary', styles.element)}>
                        {roleBindingsHTML}
                    </div>
                </div>
            );
        });

        return (
            <div className="ms-Grid ms-fontColor-white">
                <div className="ms-Grid-row ms-font-xl ms-fontColor-themePrimary">Who has access to this site?</div>
                {roles}
            </div>
        );
    }
}