interface RequestOptions extends RequestInit {
  token?: string | null;
}

const request = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: options.token ? `Bearer ${options.token}` : "",
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export class Request {
  static async get(url: string, options?: RequestOptions) {
    return await request(url, {
      method: "GET",
      ...options,
    });
  }

  static async post(url: string, body: any, options?: RequestOptions) {
    const jsonBody = JSON.stringify(body);

    return await request(url, {
      method: "POST",
      body: jsonBody,
      ...options,
    });
  }

  static async put(url: string, body: any, options?: RequestOptions) {
    const jsonBody = JSON.stringify(body);

    return await request(url, {
      method: "PUT",
      body: jsonBody,
      ...options,
    });
  }
}
