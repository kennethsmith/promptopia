# Promptopia: The artifact from a NextJs crash course on YouTube
It is a CRUD application that has the concept of profiles and users that allows you to create, read, update and delete objects made up of a text prompt and a text tag. Super simple, effective learning tool though.

## This README.md
There is some boilerplate content from the initial NextJS bootstrap application application README.md here. In app, there are some style changes that made, TypeScript is used and the API organization was changed from the video application. Some changes and local setup were madee to make local developement life easier. There are some other topics I thought useful here as well. Hopefully the table of contents will be organized well enough to make sense of it.

# Table of Contents
- [Get it started](#get-it-started)
- [Other App Commands](#other-app-commands)
- [Local Tools](#local-tools)
- [Installing Node](#installing-node)
- [Installing Docker](#installing-docker)
- [Installing MongoDB](#installing-mongodb)
- [Installing MongoDB Compass](#installing-mongodb-compass)
- [Unstalling VS Code](#installing-vs-code)
- [Auth Take](#auth-take)
- [Providers Take]()
- [Feature TODOs left from the video](#feature-todos-left-from-the-video)
- [Other feature TODOs](#other-feature-todos)
- [Production TODOs](#production-todos)
- [Quirks](#quirks)
- [Learn More](#learn-more)


## Get it started
Get the MongoDB Docker instance going.

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Login in as kevin.smith@email.com with password 123.


## Other App Commands
```bash
npm run dev
npm run build
npm run start
npm run lint
```


## Local Tools
NextJS
Node 
Docker
MomgoDB
MongoDB Compass
VS Code


## Installing Node
1. brew install node


## Installing Docker
1. Download it here: https://www.docker.com/get-started/


## Installing MongoDB
Assuming Homebrew and Docker are installed.

1. ```docker pull mongodb/mongodb-community-server:latest```
2. ```docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest```
3. ```docker container ls```

This is optional, MongoDB Compass can connect too.
1. ```brew install mongosh```
2. ```mongosh --port 27017```
3. ```db.runCommand( { hello: 1 } )```


## Installing MongoDB Compass
1. ```curl -O https://downloads.mongodb.com/compass/mongodb-compass-1.43.0-darwin-x64.dmg``` (or https://www.mongodb.com/try/download/compass)
2. Connection string: ```mongodb://localhost:27017/```

## Installing VS Code
1. Download here: https://code.visualstudio.com/download
VS Code was used and it worked great on a Mac. The config to run in debug mode is checked in. There some things I was not used to, it was ok though.

## Auth Take
I was expecting standard HS256 JWTs in the Authorization: Bearer ${JWT} form, nope. NextJS/Next-Auth, use MSE encryption JWE in the cookie header. 

So you have these in the cookies header:
```
next-auth.csrf-token=719425983dbbaa8b55e8fe14a94a10c79d640fe836de4aab204a3d223e3eeb3c%7C1236d6cfb0e7edad8ce4912b2ef5383d65904b5251c0c4f24c52c913bb39f7fd
next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..RJR-rEpkol9qobNo.lDDIt4eYA6jyqWp9rWieTGjYbbDnTbYiXNFs3rV00bfuCHRtEIVeM0IfIvN1nLpcorokVT02cpmZrm8VRsE-
```
The next-auth.session-token decripts to something like this:
```
{
  "alg": "dir",
  "enc": "A256GCM"
}

{
  "name": "Kevin Smith",
  "email": "kevin.smith@email.com",
  "picture": "/assets/images/users/ksmith.png",
  "sub": "018fd596-90af-7012-bd0e-6536c0fe039a",
  "iat": 1718296150,
  "exp": 1720888150,
  "jti": "dc62166a-5fb4-425b-9e7a-1446b369b7d0"
}
```
The next-auth-csrf-token is needed when sending credentials if you try to use the Next-Auth endpoints as APIs. I didn't do much exploration there.

I experimented with some curls and it works just fine using the cookies. The Next-Auth code also looked like it is looking in the Authorization header and parsing using Bearer. I am not sure if you can change the JWT/JWE algorithms, there is a library called Jose that I think does a more traditional JWT setup and may allow that.

The secret for the JWE is stored in the .env file, in the NEXTAUTH_SECRET key. It was generated with this command:
```
openssl rand -base64 32
```

## Providers Take
Only a mock CredentialsProvider is provided and used. I did skeleton a GitHub and Google, I never tried them though. It'd be interesting to play around in that space a bit more.

## Feature TODOs left from the video
- Implement Search (auto search on type)
    - Prompt
    - Tag
    - Username
- Implement Click on tag
- Implement View other profiles


## Other feature TODOs
- Try multiple providers
- Username vs. email (I skipped the username concept and just duplicated email in the value)
- Better authorization after authenticated (resources are protect by email match on the resource and token right now)
- Deploy on Cloud
- Token refresh
- DB Connections (It is done once, there is some work to be done there around retries, connection pools, etc.)
- Abstraction library for API responses.
- So much more...


## Production TODOs
- TESTS!!!
- Logging/Observability hooks
- Drop the .env file, leverage system environment variables
- Loadbalancing strategy
- Performance
- Deploy strategy (I've never used Vercel only AWS, so not sure about the quirks)
- So much more...


## Quirks
- A build warning comes up with the base Next.js bootstarp project. It doesn't hurt anything.
- If MongoDB isn't up and running the build gives some errors/warning. No harm there.
- Post vs. Prompts (Post and Prompt are used a bit interchangeably, a little ubiquitous language violation.)
- There are more...


## Learn More
- The crash course video: https://www.youtube.com/watch?v=wm5gMKuwSYk
- The crash course code: https://github.com/adrianhajdin/project_next_14_ai_prompt_sharing
- JWE: https://auth0.com/docs/secure/tokens/access-tokens/json-web-encryption
- JWE: https://openid.net/specs/draft-jones-json-web-encryption-02.html
- Jose: https://supunawa.medium.com/next-js-app-router-authentication-sessions-cookies-jwts-7b4429a7fd31

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.