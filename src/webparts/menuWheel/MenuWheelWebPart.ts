import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { SPComponentLoader } from "@microsoft/sp-loader";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "MenuWheelWebPartStrings";
import { MenuWheel } from "./components/MenuWheel";
import { IMenuWheelProps } from "./components/IMenuWheelProps";

export interface IMenuWheelWebPartProps {
  description: string;
}

export default class MenuWheelWebPart extends BaseClientSideWebPart<
  IMenuWheelWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IMenuWheelProps> = React.createElement(
      MenuWheel,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected async onInit(): Promise<void> {
    await super.onInit();

    SPComponentLoader.loadCss(
      "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    );
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
