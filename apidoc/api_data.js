define({ "api": [
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
  }
] });
