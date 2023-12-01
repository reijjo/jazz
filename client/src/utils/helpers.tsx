import { Dispatch, SetStateAction } from "react";
import { InfoMsg } from "./types";
import { isAxiosError } from "axios";

// Setting info message and cleaning up code
type okResponse = {
  message: string;
  info: string;
};

export const infoMsgFunc = (
  res: okResponse,
  setInfoMessage: Dispatch<SetStateAction<InfoMsg>>
) => {
  setInfoMessage({
    message: res.message,
    style: res.info,
  });
  setTimeout(() => {
    setInfoMessage({
      message: null,
    });
  }, 7000);
};

// Handling errors and also cleaning up some code
export const errorMsgFunc = (
  error: unknown,
  setInfoMessage: Dispatch<SetStateAction<InfoMsg>>,
  style: string
) => {
  if (isAxiosError(error)) {
    setInfoMessage({
      message: error.response?.data?.message,
      style: style,
    });
    setTimeout(() => {
      setInfoMessage({
        message: null,
      });
    }, 7000);
  } else {
    console.log("Weird error", error);
  }
};
