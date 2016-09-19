import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneToggle
} from '@microsoft/sp-client-preview';

import {
  EnvironmentType,
  Log
} from '@microsoft/sp-client-base';

//import styles from './SpFxNuggets.module.scss';
import * as strings from 'spFxNuggetsStrings';
import { ISpFxNuggetsWebPartProps } from './ISpFxNuggetsWebPartProps';

import {IWebInfo} from './data/IWebInfo';
import {IWebInfoProvider} from './data/IWebInfoProvider';
import {MockWebInfoProvider} from './data/MockWebInfoProvider';
import {WebInfoProvider} from './data/WebInfoProvider';


export default class SpFxNuggetsWebPart extends BaseClientSideWebPart<ISpFxNuggetsWebPartProps> {

  private _webInfoProvider: IWebInfoProvider;

  public constructor(context: IWebPartContext) {
    super(context);

    const isDebug: boolean =
      DEBUG && (this.context.environment.type === EnvironmentType.Test || this.context.environment.type === EnvironmentType.Local);

    this._webInfoProvider = isDebug
      ? new MockWebInfoProvider()
      : new WebInfoProvider(context);

  }

  public render(): void {
    this.context.statusRenderer.clearError(this.domElement);
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, strings.Loading);
    Log.verbose('SpFxNuggets', 'Invoking render');

    this._webInfoProvider.getWebInfo().then((webInfo: IWebInfo) => {
      if (this.properties.fail) {
        throw new Error('Mayday');
      }
      Log.info('SpFxNuggets', 'Service OK', this.context.serviceScope);
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      this.context.domElement.innerHTML = `<h1>${webInfo.title}</h1>`;

    }).catch((err) => {
      Log.error('SpFxNuggets', err);
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      this.context.statusRenderer.renderError(this.domElement, err);
    });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('fail', {
                  label: strings.Fail
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
