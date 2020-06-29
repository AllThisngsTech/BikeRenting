# RentBike

** Version 1.1 **

# FEATURES

1.Basic Authentication (Register/Login with hashed password).

2.JWT Tokens, make requests with a token after login with Authorization header with value Bearer yourToken where yourToken will be returned in Login response and for session

3.Created an endpoint to retrieve all bicycles and their necessary information.

4.Created an endpoint to rent a bicycle. A user who currently rents a bike should not be able to rent a second bicycle at the same time.

5.Created an endpoint to return a bicycle. A user shouldn't be able to return a bicycle that he hasn't rented.

6.Linting with [Eslint](https://eslint.org/).


# SOFTWARE  REQUIREMENTS

Node.js 8+

MongoDB (Recommended 4+)

# Install npm dependencies after installing (Git or manual download)

cd "myproject"
npm install

### Running  API server locally

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
Connected to db

Press CTRL + C to stop the process.
```
**Note:**  `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.

## ESLint

### Running  Eslint

```bash
npm run lint
```

You can set custom rules for eslint in `.eslintrc.json` file, Added at project root.

# Sample Schema and API

## User Schema and SignUp

API : localhost:<yourPort>/user/signup
  
{
"_id":"5ef30d5e93512327a5ab831e" //populates by typeId,

"email":"biketest4@test.com",

"password":"hashed",

"rent_status":"false",

"latitude":"41.86844",

"longitude":"8.98654"
}

## API to Login
  
API : localhost:<yourPort>/user/login
 On success:  {
  "message":"Auth successfull",
  "token":""
  }
  

## Bike Schema:

"_id":"5ef30d5e93512327a5ab831",// populates by typeId
"status":"false"

## Create Bikes(post request)
localhost:<yourPort>/rentals
 ### Body:
  {
       "Status":""
        }
### on Success:
 {"_id":"",
            "Status":""
            }
  ## API to Get all Bikes 
localhost:<yourPort>/rentals
  
on Success: {
              List of all the Bikes present in the DB.
            }

## API to rent a bike. (post)
localhost:<yourPort>/user/rent_bike
 ### Note: pass token in the header for authorization.
 ### Body:  
 {
    "userId":"",
    "bikeId":""
}  
### On Success: 
 {
    "message": "bike rented",
    "createdproduct": {
  
    }
}

## API to return a a rented bike.(post)

localhost:3000/user/return_bike

 ### Note: pass token in the header for authorization.
 
 ### Body:
  {
          "userId":""
       }
       
 ### On Suscess: 
 {
    "message": "bike returned"
}   


