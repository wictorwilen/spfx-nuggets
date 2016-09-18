declare namespace SharePoint.REST {
  export interface ODataBase {
    "@odata.context": string;
    "@odata.editLink": string;
    "@odata.id": string;
    "@odata.type": string;
  }


  export interface Web extends ODataBase {
    AllowRssFeeds: boolean;
    AlternateCssUrl: string;
    AppInstanceId: string;
    Configuration: number;
    Created: Date;
    CurrentChangeToken: any;
    CustomMasterUrl: string;
    Description: string;
    DocumentLibraryCalloutOfficeWebAppPreviewersDisabled: string;
    EnableMinimalDownload: boolean;
    Id: string;
    IsMultiLingual: boolean;
    LastItemModifiedDate: Date;
    LastItemUserModifiedDate: Date;
    NoCrawl: boolean;
    OverwriteTranslationsOnChange: boolean;
    QuickLaunchEnabled: boolean;
    RecycleBinEnabled: boolean;
    ServerRelativeUrl: string;
    SiteLogoUrl: string;
    SyndicationEnabled: boolean;
    Title: string;
    TreeViewEnabled: boolean;
    UIVersion: number;
    UIVersionConfigurationEnabled: boolean;
    Url: string;
    WebTemplate: string;
  }
}