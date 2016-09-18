import {IWebInfoProvider} from './IWebInfoProvider';
import {IWebInfo} from './IWebInfo';

export class MockWebInfoProvider implements IWebInfoProvider {
  constructor() {
  }
  public getWebInfo(): Promise<IWebInfo> {
    return new Promise<IWebInfo>((resolve) => {
      setTimeout(() => resolve(<IWebInfo>{
        title: 'Web title',
        url: 'https://contoso.sharepoint.com/sites/web',
        webTemplate: 'STS'
      }), 2000);
    });
  }
}