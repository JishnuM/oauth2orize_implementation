# Oauth 2.0 Server Implementation

Oauth 2.0 Server built with Express 4, Mongoose, Passport and Oauth2orize

Implementation of:
 - Implicit flow strategies
 - Protected API access with scope
 - API access through JavaScript SDK

##  Usage

This is an implementation of an Oauth2.0 provider with the implicit flow authorization method strongly developed, and asample Javascript SDK added to access the provider.

### Registration and Account

New users can register at /registration and can view account details at /account

When users are logged in, they can create client applications at /client/registration

Users can view details of created apps at /account/appdetails

### Login

The standard flow login endpoint is /login
The implicit flow login endpoint is /loginImplicit
Logout endpoint is at /logout

### API and Scope

The included API endpoints are get and post to /me/info.
These require 'info-read' and 'info-write' permissions respectively.

### Javascript SDK

The included file js-sdk/sdk.js can be used to execute login, logout and api calls through Javascript.

The example js-sdk/index.html includes a demonstration of login, get and post of information.
