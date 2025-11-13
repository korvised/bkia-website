import { AxiosError } from "axios";
import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { alertService } from "@/services";

type NestJsErrorData = {
  statusCode?: number;
  message?: string | string[];
  error?: string | { field: string; message: string }[];
};

type RTKQueryErrorPayload = {
  status: number;
  data: NestJsErrorData;
};

export const errorHandler: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const actionType = (action?.type || "") as string;

    const isFetchCurrentUser = actionType.includes("fetchCurrentUser");
    if (isFetchCurrentUser) return next(action);

    const payload = action.payload;

    // ✅ Case 1: RTK Query (payload.data)
    if (
      payload &&
      typeof payload === "object" &&
      "data" in payload &&
      typeof payload.data === "object"
    ) {
      const data = (payload as RTKQueryErrorPayload).data;
      handleNestJsError(data, "[RTK Query Error]");
    }

    // ✅ Case 2: Thunk AxiosError (payload.response.data)
    else if (
      payload instanceof AxiosError &&
      payload.response?.data &&
      typeof payload.response.data === "object"
    ) {
      const data = payload.response.data as NestJsErrorData;
      handleNestJsError(data, "[Thunk Axios Error]");
    }

    // ✅ Case 3: String payload
    else if (typeof payload === "string") {
      alertService.error("", payload);
      // console.error("[Thunk Error]", payload);
    }

    // ✅ Fallback
    else {
      alertService.error("Something went wrong", "Unexpected error");
      // console.error("[Unknown Error]", payload);
    }
  }

  return next(action);
};

function handleNestJsError(data: NestJsErrorData, label = "") {
  const title =
    typeof data.message === "string"
      ? data.message
      : (label ?? "Something went wrong");

  let text = "";

  if (
    Array.isArray(data.error) &&
    data.error.every((e) => typeof e === "object" && "message" in e)
  ) {
    text = data.error.map((e) => e.message).join("\n");
  } else if (typeof data.error === "string") {
    text = data.error;
  } else if (typeof data.message === "string") {
    text = data.message;
  }

  alertService.error(text, title);
  // console.error(label, data);
}
