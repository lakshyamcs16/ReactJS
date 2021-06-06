import React from "react";

// A modal context that is provided by the ModalProvider
export const ModalContext = React.createContext({
  openModal: (Component) => {},
  closeModal: () => {}
});
