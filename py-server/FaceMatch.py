import requests 
import face_recognition
from io import BytesIO

# Function to download an image directly from a URL
def download_image_direct(imgMetaData):
    if 'id' in imgMetaData and imgMetaData['id'] is not None: 
        response = requests.get(url=imgMetaData['config']['url'], params=imgMetaData['config']['params'], headers=imgMetaData['config']['headers'])
        print(response.status_code)
        if response.status_code == 200:
            return BytesIO(response.content)
        else:
            return None
    else:
        response = requests.get(imgMetaData['url'])
        print(response.status_code)
        if response.status_code == 200:
            return BytesIO(response.content)
        else:
            return None
        

# Function to compute face encodings for a single person
def single_person_encodings(image_data):
    return face_recognition.face_encodings(face_recognition.load_image_file(image_data))[0]

# Function to compute face encodings for a group of people
def group_person_encodings(image_data):
    image = face_recognition.load_image_file(image_data)
    return face_recognition.face_encodings(image, face_recognition.face_locations(image))

# Function to recognize a face in a group
def recognize_face(single_person_imgMetaData, group_person_imgMetaData):
    single_personEncodings =  single_person_encodings(download_image_direct(single_person_imgMetaData))
    group_personEncodings =  group_person_encodings(download_image_direct(group_person_imgMetaData))
    
    # group_person_imgMetaData['face_encoding'] = group_personEncodings
    
    for face_encoding in group_personEncodings:
        matches =  face_recognition.compare_faces([single_personEncodings], face_encoding)
        if True in matches:
            return {"match": "true"}
    return {"match": "false"}
