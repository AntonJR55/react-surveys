import { useCallback } from "react";

export const useAppHttp = () => {
    const request = useCallback(
        async (
            url: string,
            method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
            body: any = null,
            headers: Record<string, string> = {
                "Content-Type": "application/json",
            }
        ) => {
            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                });

                if (!response.ok) {
                    throw new Error(
                        `Could not fetch ${url}, status: ${response.status}`
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
