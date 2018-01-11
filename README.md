[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

# AVS Companion site example

## Features

- OAuth2 login
- Access Token / Refresh Token

## Installation

### Install web server

Download and Install

```sh
$ git clone https://github.com/webispy/avs_companion.git
$ cd avs_companion
$ npm install
```

Run

```sh
$ node bin/www
listening on port 3000
```

### Register Alexa Voice Service

https://developer.amazon.com/avs/home.html#/avs/home

Click the **CREATE PRODUCT** Button

#### Step 1 of 2: Product information

- Product name: ... (e.g. MyAVS)
- Product ID: ... (e.g. AVSTest) - **Copy this value to notepad**
- Product type: Alexa-Enabled Device
- Will your device use a companion app? No
- How will end users interact with your product? Choose anything
- Do you intend to distribute this product commercially? No
- Is this a children’s product or is it otherwise directed to children younger than 13 years old? No
- click **NEXT** Button

#### Step 2 of 2: LWA Security Profile

- Security Profile: click **CREATE NEW PROFILE**

#### Step 2 of 2: LWA Security Profile - New profile

- Security Profile Name: ...
- Security Profile Description: ...
- click **NEXT** Button

#### Step 2 of 2: LWA Security Profile - Platform Information

- Platform Information: Web
- Copy **Client ID** and **Client secret** to notepad
- Allowed return URLs: https://localhost:3000/avs/callback
- click **FINISH** Button

### Setup AVS Companion site

Open web browser with http://localhost:3000/setup
- Client ID: paste **Client ID** from notepad
- Client Secret: paste **Client secret** from notepad
- Device Type ID: paste **Product ID** from notepad
- click **SAVE**
- Restart web server

## Get token !!

Open web browser with http://localhost:3000/setup
- Click **Get token** button
- Login with your alexa account
- Allow your product
- DONE. Copy the token to your AVS application
- The token is valid for one hour only. After one hour, you have to get the value again through the refresh token process.

# License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Inho Oh <webispy@gmail.com>
