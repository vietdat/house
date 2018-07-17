define({ "api": [
  {
    "type": "get",
    "url": "/api/file/:fileName",
    "title": "Get file",
    "name": "GetFile",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>file</p>"
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
            "field": "data:url",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/FileController.ts",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/file/:fileName"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/file/upload",
    "title": "Upload file",
    "name": "UploadFile",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>file</p>"
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
            "field": "data:url",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/FileController.ts",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/file/upload"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/file/multi/upload",
    "title": "Upload multi file",
    "name": "uploadMultiFile",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>file</p>"
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
            "field": "data:url",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/FileController.ts",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/file/multi/upload"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/mail",
    "title": "Send mail",
    "name": "sendMail",
    "group": "Mail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subject",
            "description": "<p>subject</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
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
    "filename": "src/controller/MailController.ts",
    "groupTitle": "Mail",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/mail"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/mail/multi",
    "title": "Send multi mail",
    "name": "sendMultiMail",
    "group": "Mail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "[string]",
            "optional": false,
            "field": "emails",
            "description": "<p>emails</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subject",
            "description": "<p>subject</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
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
    "filename": "src/controller/MailController.ts",
    "groupTitle": "Mail",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/mail/multi"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/sms/multi",
    "title": "Send multi sms",
    "name": "sendMultiSms",
    "group": "Sms",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "[string]",
            "optional": false,
            "field": "phoneNumbers",
            "description": "<p>phoneNumbers</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
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
    "filename": "src/controller/SmsController.ts",
    "groupTitle": "Sms",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/sms/multi"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/sms",
    "title": "Send sms",
    "name": "sendSms",
    "group": "Sms",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phoneNumber</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
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
    "filename": "src/controller/SmsController.ts",
    "groupTitle": "Sms",
    "sampleRequest": [
      {
        "url": "http://localhost:5000/api/sms"
      }
    ]
  }
] });
