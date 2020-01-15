import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IListSitePermissionsWebPartProps } from '../ListSitePermissionsWebPart';

export interface IListSitePermissionsProps extends IListSitePermissionsWebPartProps {
  context: IWebPartContext;
}
