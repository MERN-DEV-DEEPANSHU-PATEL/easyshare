import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  userId: {
    type: String,
    required: true,
  },
  eventPoster: {
    type: Object,
    required: true,
  },
  mediaUrls: {
    type: [Object], // This will accept both mediaSchema1 and mediaSchema2
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  isFaceRecognition: {
    type: Boolean,
    required: true,
  },
  uploadAccessKey: {
    type: String,
    required: true,
    min: 6,
    max: 10,
  },
  getAccessKey: {
    type: String,
    required: true,
    min: 6,
    max: 10,
  },
  allMediaUrls: {
    type: [Object],
  },
  recognizedPerson: {
    type: [Object],
  },
});

// Define the EventModel
const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;

/*
{
  "eventName":"Goa Tour",// validataion max:50 , min:3
  "userId":"here is userId",// validataion null
  "mediaUrls":[
      {
          "uploaderName":"Deepu Patel",// validataion max:50 , min:3
          "PhoneNumber":"9876543210",// validataion lenght = 10 and number
          "isGoogleDrive":true | false, // validataion boolean
          "isFreeHost":true | false,// validataion boolean
          "googleDriveLink":["url of google drive"],// validataion array with string value max:array length will 5 and string length 500
          "freeHostImages":[{
              "baseUrl":"https://iili.io",
              "idsName":["indk.jpg"]// validataion max:50 , min:5
          }]// validataion array with object value max:2000 length of array
      }
  ],
  "isPublic":false,// validataion boolean
  "isFaceRecognition":false // validataion boolean,
  "uploadAccessKey":123015,//   validataion max:10 , min:6
  "getAccessKey":123650,//validataion max:10 , min:6
  "allMediaUrls":[
      {
      details of image
      }
  ],
  "recognizedPerson":[]
}*/
