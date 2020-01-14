import {ISPList} from './ISPList';

export interface ISPDataService {
    getLists():Promise<ISPList[]>;
}