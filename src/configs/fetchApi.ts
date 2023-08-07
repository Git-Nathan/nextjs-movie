import { ACCESS_TOKEN_KEY } from "@/utils/contants";

export async function fetchApi(
  url: string,
  method: "get" | "post" | "delete" | "put",
  body?: any
): Promise<any> {
  const response = await fetch(url, {
    method,
    body: typeof body === "object" ? JSON.stringify(body) : body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    // handle unauthorized error here.
  }

  return response.json();
}
