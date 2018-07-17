define({ "api": [
  {
    "type": "get",
    "url": "/api/user/auth/facebook",
    "title": "Authenticate facebook",
    "name": "Authenticate_facebook",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization facebook.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": "<p>,</p>"
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:token",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/facebook"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/auth/google",
    "title": "Authenticate google",
    "name": "Authenticate_google",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization google.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": "<p>,</p>"
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:token",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/google"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/auth/twitter",
    "title": "Authenticate twitter",
    "name": "Authenticate_twitter",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization twitter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": "<p>,</p>"
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:token",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/twitter"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/auth/otpToken/:otpToken",
    "title": "checkOtpToken",
    "name": "CheckPhoneExist",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phoneNumber</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otpToken",
            "description": "<p>otpToken</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/otpToken/:otpToken"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/auth/:phoneNumber/exist",
    "title": "Check phone exist",
    "name": "CheckPhoneExist",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/:phoneNumber/exist"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/auth/forgotpassword",
    "title": "Forgotpassword",
    "name": "Forgotpassword",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phoneNumber</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/forgotpassword"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/auth/login",
    "title": "Login",
    "name": "Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:token",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/auth/resend/token",
    "title": "Resend otp token",
    "name": "ResendOtp",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/resend/token"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/auth/check/:token",
    "title": "check token",
    "name": "checkToken",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/check/:token"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/auth/logout",
    "title": "logout",
    "name": "logout",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/logout"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/auth/updatepassword",
    "title": "Update password",
    "name": "updatepassword",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phoneNumber</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>newPassword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>oldPassword</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AuthController.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/auth/updatepassword"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/user/comment",
    "title": "Create comment",
    "name": "CreateComment",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propId",
            "description": "<p>propId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propType",
            "description": "<p>propType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userType",
            "description": "<p>userType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>comment</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rating",
            "description": "<p>rating</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/comment"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/user/project",
    "title": "Create project",
    "name": "CreateProject",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "properties",
            "description": "<p>properties</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postCode",
            "description": "<p>postCode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "promotion",
            "description": "<p>promotion</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bedroom",
            "description": "<p>bedroom</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bathroom",
            "description": "<p>bathroom</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "direction",
            "description": "<p>direction</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isOwner",
            "description": "<p>isOwner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ownerId",
            "description": "<p>ownerId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>place</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "from",
            "description": "<p>from</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "to",
            "description": "<p>to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "totalProperty",
            "description": "<p>totalProperty</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "videos",
            "description": "<p>videos</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "utilityImages",
            "description": "<p>utilityImages</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "utilityNames",
            "description": "<p>utilityNames</p>"
          },
          {
            "group": "Parameter",
            "type": "[JSON]",
            "optional": false,
            "field": "documents",
            "description": "<p>documents</p>"
          },
          {
            "group": "Parameter",
            "type": "[JSON]",
            "optional": false,
            "field": "designImages",
            "description": "<p>designImages</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/project"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/user",
    "title": "Create new user",
    "name": "CreateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "familyName",
            "description": "<p>family name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "givenName",
            "description": "<p>given name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Phone number</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/user/property",
    "title": "Create property",
    "name": "Createproperty",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "properties",
            "description": "<p>properties</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postCode",
            "description": "<p>postCode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "promotion",
            "description": "<p>promotion</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "introduce",
            "description": "<p>introduce</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bedroom",
            "description": "<p>bedroom</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bathroom",
            "description": "<p>bathroom</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "direction",
            "description": "<p>direction</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isOwner",
            "description": "<p>isOwner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ownerId",
            "description": "<p>ownerId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>place</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "from",
            "description": "<p>from</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "to",
            "description": "<p>to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "totalProperty",
            "description": "<p>totalProperty</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "videos",
            "description": "<p>videos</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "utilityImages",
            "description": "<p>utilityImages</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "utilityNames",
            "description": "<p>utilityNames</p>"
          },
          {
            "group": "Parameter",
            "type": "[JSON]",
            "optional": false,
            "field": "documents",
            "description": "<p>documents</p>"
          },
          {
            "group": "Parameter",
            "type": "[JSON]",
            "optional": false,
            "field": "designImages",
            "description": "<p>designImages</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/property"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/user/report",
    "title": "Create report",
    "name": "Createreport",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "propId",
            "description": "<p>propId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propType",
            "description": "<p>propType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userType",
            "description": "<p>userType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/report"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/agent/search",
    "title": "Find agent by id",
    "name": "FindAgentById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:[Agent]",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/agent/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/agent/byid/:id",
    "title": "Find agent by id",
    "name": "FindAgentById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:Agent",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/agent/byid/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/comment/byid/:id",
    "title": "Get comment by id",
    "name": "FindCommnetById",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/comment/byid/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/project/byid/:id",
    "title": "Find project by id",
    "name": "FindProjectById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:Project",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/project/byid/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/project/search",
    "title": "Find project by id",
    "name": "FindProjectById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:[Project]",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/project/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/property/byid/:id",
    "title": "Find property by id",
    "name": "FindPropertyById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:property",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/property/byid/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/property/search",
    "title": "Find property by id",
    "name": "FindPropertyById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:[property]",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/property/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/transaction/byid/:id",
    "title": "Find transaction by id",
    "name": "FindTransactionById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:transaction",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/transaction/byid/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/byId/:id",
    "title": "Get user by Id",
    "name": "FindUserById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/byId/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/report/byid/:id",
    "title": "Get report by id",
    "name": "GetreportById",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:report",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/report/byid/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/user/interested",
    "title": "Interested project and peoperty",
    "name": "Interested",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "propId",
            "description": "<p>propId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propType",
            "description": "<p>propType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userType",
            "description": "<p>userType</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/interested"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/comment/search",
    "title": "Search comment",
    "name": "SearchComment",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/comment/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/interested/search",
    "title": "search interested of property and project",
    "name": "SearchInterested",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:[interested]",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/interested/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/transaction/search",
    "title": "search transaction",
    "name": "SearchTransaction",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:[transaction]",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/transaction/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/search",
    "title": "Search user",
    "name": "SearchUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/report/search",
    "title": "Search report",
    "name": "Searchreport",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:[report]",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/report/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/staff/search",
    "title": "search staff",
    "name": "Searchstaff",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "data:[staff]",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/staff/search"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/:id/comment",
    "title": "Update comment",
    "name": "UpdateComment",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propId",
            "description": "<p>propId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propType",
            "description": "<p>propType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userType",
            "description": "<p>userType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>comment</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rating",
            "description": "<p>rating</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/:id/comment"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/project",
    "title": "Update interested",
    "name": "UpdateInterested",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "propId",
            "description": "<p>propId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propType",
            "description": "<p>propType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userType",
            "description": "<p>userType</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/project"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/:id/project",
    "title": "Update project",
    "name": "UpdateProject",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "properties",
            "description": "<p>properties</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postCode",
            "description": "<p>postCode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "promotion",
            "description": "<p>promotion</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bedroom",
            "description": "<p>bedroom</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bathroom",
            "description": "<p>bathroom</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "direction",
            "description": "<p>direction</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isOwner",
            "description": "<p>isOwner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ownerId",
            "description": "<p>ownerId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>place</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "from",
            "description": "<p>from</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "to",
            "description": "<p>to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "totalProperty",
            "description": "<p>totalProperty</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "videos",
            "description": "<p>videos</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "utilityImages",
            "description": "<p>utilityImages</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "utilityNames",
            "description": "<p>utilityNames</p>"
          },
          {
            "group": "Parameter",
            "type": "[JSON]",
            "optional": false,
            "field": "documents",
            "description": "<p>documents</p>"
          },
          {
            "group": "Parameter",
            "type": "[JSON]",
            "optional": false,
            "field": "designImages",
            "description": "<p>designImages</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/:id/project"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/property",
    "title": "Update property",
    "name": "UpdateProperty",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "properties",
            "description": "<p>properties</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postCode",
            "description": "<p>postCode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "promotion",
            "description": "<p>promotion</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "introduce",
            "description": "<p>introduce</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bedroom",
            "description": "<p>bedroom</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bathroom",
            "description": "<p>bathroom</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "direction",
            "description": "<p>direction</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isOwner",
            "description": "<p>isOwner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ownerId",
            "description": "<p>ownerId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>place</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "from",
            "description": "<p>from</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "to",
            "description": "<p>to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "totalProperty",
            "description": "<p>totalProperty</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "videos",
            "description": "<p>videos</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "utilityImages",
            "description": "<p>utilityImages</p>"
          },
          {
            "group": "Parameter",
            "type": "[Json]",
            "optional": false,
            "field": "utilityNames",
            "description": "<p>utilityNames</p>"
          },
          {
            "group": "Parameter",
            "type": "[JSON]",
            "optional": false,
            "field": "documents",
            "description": "<p>documents</p>"
          },
          {
            "group": "Parameter",
            "type": "[JSON]",
            "optional": false,
            "field": "designImages",
            "description": "<p>designImages</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/property"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/:id/update",
    "title": "Update user",
    "name": "UpdateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthDate",
            "description": "<p>birthDate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>gender</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "language",
            "description": "<p>language</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>avatar</p>"
          },
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postCode",
            "description": "<p>postCode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "introduce",
            "description": "<p>introduce</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": false,
            "field": "identifies",
            "description": "<p>identifies</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>company</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/:id/update"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/:id/report",
    "title": "Update report",
    "name": "Updatereport",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "propId",
            "description": "<p>propId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propType",
            "description": "<p>propType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userType",
            "description": "<p>userType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/:id/report"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/wallet",
    "title": "Get wallet of user",
    "name": "WalletOfUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/wallet"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/user/transaction",
    "title": "Create transaction",
    "name": "transaction",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "salerId",
            "description": "<p>salerId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "salerType",
            "description": "<p>salerType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buyerId",
            "description": "<p>buyerId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buyerType",
            "description": "<p>buyerType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propertyId",
            "description": "<p>propertyId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/transaction"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/:id/transaction",
    "title": "Update transaction",
    "name": "transaction",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>authorization.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "salerId",
            "description": "<p>salerId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "salerType",
            "description": "<p>salerType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buyerId",
            "description": "<p>buyerId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buyerType",
            "description": "<p>buyerType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "propertyId",
            "description": "<p>propertyId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "success:true",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/UserController.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/user/:id/transaction"
      }
    ]
  }
] });
