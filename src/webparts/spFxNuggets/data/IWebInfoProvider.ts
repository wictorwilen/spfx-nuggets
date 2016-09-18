import {IWebInfo} from './IWebInfo';

export interface IWebInfoProvider {
  getWebInfo(): Promise<IWebInfo>;
}
