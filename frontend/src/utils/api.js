class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(
        `something get wrong. Status: ${response.status}, ${response.statusText}`
      );
    }
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: { authorization: this._token },
    });

    return this._checkResponse(response);
  }

  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: { authorization: this._token },
    });

    return this._checkResponse(response);
  }

  async addCard(name, link) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, link: link }),
    });

    return this._checkResponse(response);
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });

    return this._checkResponse(response);
  }

  async editProfile({ name, about }) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, about: about }),
    });

    return this._checkResponse(response);
  }

  async getCardLikesData(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "GET",
      headers: { authorization: this._token },
    });

    return this._checkResponse(response);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });

    return this._checkResponse(response);
  }

  async changeProfilePicture(avatar) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: avatar }),
    });

    return this._checkResponse(response);
  }
}

export default new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  token: "eba68a1e-4841-45cc-961e-923f0a471f18",
});
