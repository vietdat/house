define({ "api": [
  {
    "type": "post",
    "url": "/api/admin/comment/:id/active",
    "title": "Active comment",
    "name": "ActiveComment",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/comment/:id/active"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/sale/:id/active",
    "title": "Active sale",
    "name": "ActiveSale",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/sale/:id/active"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/admin",
    "title": "Create new admin",
    "name": "CreateAdmin",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/admin/comment",
    "title": "Create comment",
    "name": "CreateComment",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/comment"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/admin/project",
    "title": "Create project",
    "name": "CreateProject",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/project"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/admin/project",
    "title": "Create project",
    "name": "CreateProject",
    "group": "Admin",
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
            "type": "[String]",
            "optional": false,
            "field": "saleAreas",
            "description": "<p>saleAreas</p>"
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/project"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/admin/property",
    "title": "Create property",
    "name": "Createproperty",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/property"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/comment/byid/:id",
    "title": "Get comment by id",
    "name": "FindCommnetById",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/comment/byid/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin/project/byid/:id",
    "title": "Find project by id",
    "name": "FindProjectById",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/project/byid/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin/project/search",
    "title": "Find project by id",
    "name": "FindProjectById",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/project/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin/property/search",
    "title": "Find property by id",
    "name": "FindPropertyById",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/property/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin/property/byid/:id",
    "title": "Find property by id",
    "name": "FindPropertyById",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/property/byid/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin/sale/byid/:id",
    "title": "Find sale by id",
    "name": "FindSaleById",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/sale/byid/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin",
    "title": "Get info admin",
    "name": "GetAdmin",
    "group": "Admin",
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
            "field": "data:admin",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin/comment/search",
    "title": "Search comment",
    "name": "SearchComment",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/comment/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin/sale/search",
    "title": "Search sale",
    "name": "SearchSale",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/sale/search"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin/transaction/search",
    "title": "Search transaction",
    "name": "SearchTransaction",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/transaction/search"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/comment/:id/softdelete",
    "title": "Soft delete comment",
    "name": "SoftDeleteComment",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/comment/:id/softdelete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/sale/:id/softdelete",
    "title": "Soft delete sale",
    "name": "SoftDeleteSale",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/sale/:id/softdelete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/transaction/:id/softdelete",
    "title": "Soft delete transaction",
    "name": "SoftDeleteTransaction",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/transaction/:id/softdelete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/transaction/:id/active",
    "title": "Soft delete transaction",
    "name": "SoftDeleteTransaction",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/transaction/:id/active"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/project/:id/softdelete",
    "title": "Soft delete project",
    "name": "Softdeleteproject",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/project/:id/softdelete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/:id/comment",
    "title": "Update comment",
    "name": "UpdateComment",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/:id/comment"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/:id/project",
    "title": "Update project",
    "name": "UpdateProject",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/:id/project"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/property",
    "title": "Update property",
    "name": "UpdateProperty",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/property"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/:id/update",
    "title": "Update user",
    "name": "UpdateUser",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/:id/update"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/:id/transaction",
    "title": "Update transaction",
    "name": "Updatetransaction",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/:id/transaction"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/admin/transaction/byid/:id",
    "title": "Find transaction by id",
    "name": "Updatetransaction",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/transaction/byid/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/project/:id/active",
    "title": "active project",
    "name": "activeproject",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/project/:id/active"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/property/:id/active",
    "title": "active property",
    "name": "activeproperty",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/property/:id/active"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/admin/property/:id/active",
    "title": "active property",
    "name": "activeproperty",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/property/:id/active"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/admin/transaction",
    "title": "Create transaction",
    "name": "transaction",
    "group": "Admin",
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
    "filename": "src/controller/AdminController.ts",
    "groupTitle": "Admin",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/admin/transaction"
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
  }
] });
