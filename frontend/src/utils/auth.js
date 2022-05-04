const BASE_URL = "https://register.nomoreparties.co";

export const register = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `something get wrong. Status: ${response.status}, ${response.statusText}`
    );
  }
};

export const authorize = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("jwt", data.token);
    return data;
  } else {
    throw new Error(
      `something get wrong. Status: ${response.status}, ${response.statusText}`
    );
  }
};

export const checkTokenAndGetUserEmail = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `something get wrong. Status: ${response.status}, ${response.statusText}`
    );
  }
};
