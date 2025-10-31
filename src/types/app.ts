export type HttpRequest = <T>(
    url: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: unknown,
    headers?: Record<string, string>
) => Promise<T>;

export type ApiError = {
    message: string;
    code?: string;
    details?: unknown;
};

export type ComboBoxValue = { code: string; label: string } | null;

export type MsgText = string;

export type PopupMsg = {
    isOpen: boolean;
    msgText: MsgText;
    msgType: "success" | "info" | "warning" | "error";
};

export interface IHttpError extends Error {
    status: number;
    data: ApiError;
}
