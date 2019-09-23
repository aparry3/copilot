// src/react-auth0-wrapper.js
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import {history} from './util'

const onRedirectCallback = appState => {
  history.push(
      appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
  );
};

export class Auth0Client {
    constructor(onRedirectCallback, redirect_uri) {
        this.onRedirectCallback = onRedirectCallback;
        this.domain = process.env.AUTH0_DOMAIN;
        this.client_id = process.env.AUTH0_CLIENT_ID;
        this.redirect_uri = redirect_uri;
        this.audience = process.env.AUTH0_IDENTIFIER;
    }

    async initialize() {
        if (!!this.client) {return true;}
        let client = await this._ensureClient()
        if (window.location.search.includes("code=")) {
            const {appState} = await client.handleRedirectCallback();
            this.onRedirectCallback(appState);
        }
        return true;
    }


    async _ensureClient() {
        if (!!this.client) {
            return this.client
        } else {
            try {
                this.client = await createAuth0Client({
                redirect_uri: this.redirect_uri,
                client_id: this.client_id,
                domain: this.domain,
                audience: this.audience
                })
                return this.client
            } catch (e) {
                throw new Error('createAuth0Client() error', e)
            }
        }

    }
    async isAuthenticated() {
        await this._ensureClient();
        return await this.client.isAuthenticated()
    }
    async getToken(...p) {
        let client = await this._ensureClient()
        return await this.client.getTokenSilently(...p)
    }
    async handleRedirectCallback() {
        let client = await this._ensureClient()
        return await client.handleRedirectCallback()
    }
    async login(...p) {
        let client = await this._ensureClient()
        return await client.loginWithRedirect(...p)
    }
    async logout(...p) {
        let client = await this._ensureClient()
        return await client.logout(...p)
    }
    async getClient() {
        return await _ensureClient()
    }
    async getUser() {
        let client = await this._ensureClient()
        return await client.getUser()
    }

}
const auth0_client = new Auth0Client(onRedirectCallback, window.location.origin)

export {auth0_client}
