import {ISPList} from '../interfaces/ISPList';
import {ISPDataService} from '../interfaces/ISPDataService';

export default class MockDataService implements ISPDataService {
    public getLists(): Promise<ISPList[]> {
        var mockData: ISPList[] = [
            { id: "1", name: "Announcements" },
            { id: "2", name: "Calendar" }
        ];
        return Promise.resolve(mockData);
    }
}