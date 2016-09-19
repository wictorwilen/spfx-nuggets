import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  GuidHelpers
} from '@microsoft/sp-client-preview';

import { Guid } from '@microsoft/sp-client-base';

import * as strings from 'guidNuggetStrings';
import { IGuidNuggetWebPartProps } from './IGuidNuggetWebPartProps';

export default class GuidNuggetWebPart extends BaseClientSideWebPart<IGuidNuggetWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {

    var g: Guid = new Guid(GuidHelpers.generateGuid()); // Issue #200
    var g2: Guid = Guid.newGuid();
    this.domElement.innerHTML = `Here's a GUID, just for you: <b>${g.toString()}</b>, and here's an extra <b>${g2.toString()}</b> in case you didn't like the first`;
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
                PropertyPaneTextField('GuidOne', {
                  label: 'Guid.isValid',
                  onGetErrorMessage: (value: string): string => {
                    if (!Guid.isValid(value)) {
                      return "Seriously? That is not a GUID!";
                    }
                    return '';
                  }
                }),
                PropertyPaneTextField('GuidTwo', {
                  label: 'GuidHelpers.isValid',
                  onGetErrorMessage: (value: string): string => {
                    if (!GuidHelpers.isValid(value)) {
                      return "Seriously? That is not a GUID!";
                    }
                    return '';
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
