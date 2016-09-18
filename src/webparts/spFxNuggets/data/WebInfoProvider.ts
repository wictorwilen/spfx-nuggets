import {HttpClient} from '@microsoft/sp-client-base';
import {IWebPartContext} from '@microsoft/sp-client-preview';
import {IWebInfoProvider} from './IWebInfoProvider';
import {IWebInfo} from './IWebInfo';

export class WebInfoProvider implements IWebInfoProvider {
  private _httpClient: HttpClient;
  private _url: string;

  constructor(context: IWebPartContext) {
    this._httpClient = context.httpClient;
    this._url = context.pageContext.web.absoluteUrl;
  }

  public getWebInfo(): Promise<IWebInfo> {
    return this._httpClient.get(this._url + '/_api/web')
      .then((response) => {
        return response.json();
      })
      .then((data: SharePoint.REST.Web) => {
        return <IWebInfo>{
          title: data.Title
        };
      })
      .catch(() => {
        return Promise.reject('An error occurred');
      });

  }
}