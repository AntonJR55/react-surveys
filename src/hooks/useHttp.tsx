import { useCallback } from "react";

export const useHttp = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const request = useCallback(
        async (
            path: string,
            method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
            body: any = null,
            headers: Record<string, string> = {
                "Content-Type": "application/json",
            }
        ) => {
            try {
                const response = await fetch(`${apiUrl}${path}`, {
                    method,
                    body,
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json();

                    const errorStatus =
                        errorData.status ||
                        errorData.statusCode ||
                        response.status;
                    const errorMessage =
                        errorData.message || response.statusText;

                    throw new Error(
                        `Could not fetch ${apiUrl}${path}, status: ${errorStatus}, message: ${errorMessage}`
                    );
                }

                const data = await response.json();
                return data;
            } catch (e) {
                throw e;
            }
        },
        []
    );

    return {
        request,
    };
};
