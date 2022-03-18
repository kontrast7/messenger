import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;


    colors: {
      mainText: string,
      background: string,
      searchbar: string,
      accentColor: string,
      secondaryAccentColor: string,
      receivedMessage: string,
      sendMessage: string,
    },

    fontSize: {
      title: string,
      contactName: string,
      messageText: string,
    },
  }
}