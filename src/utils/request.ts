const request = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export class Request {
  static async get(url: string, options?: RequestInit) {
    return await request(url, {
      method: "GET",
      ...options,
    });
  }

  static async post(url: string, body: any, options?: RequestInit) {
    const jsonBody = JSON.stringify(body);

    return await request(url, {
      method: "POST",
      body: jsonBody,
      ...options,
    });
  }

  static async put(url: string, body: any, options?: RequestInit) {
    const jsonBody = JSON.stringify(body);

    return await request(url, {
      method: "PUT",
      body: jsonBody,
      ...options,
    });
  }
}
