import {
  isWindowOpenVar,
  WindowInfoParams,
  windowInfoVar,
} from "../components/common/molecules/Window/Window";

interface WindowAlertParams extends WindowInfoParams {}
export const windowAlert = ({
  message,
  alertCallback = () => {},
}: WindowAlertParams): void => {
  windowInfoVar({
    type: "alert",
    message,
    alertCallback,
  });
  isWindowOpenVar(true);
};

interface WindowConfirmParams extends WindowInfoParams {}
export const windowConfirm = ({
  message = "Confirm?",
  noMessage = "No",
  yesMessage = "Yes",
  noCallback = () => {},
  yesCallback = () => {},
}: WindowConfirmParams): void => {
  windowInfoVar({
    type: "confirm",
    message,
    noCallback,
    noMessage,
    yesCallback,
    yesMessage,
  });
  isWindowOpenVar(true);
};
