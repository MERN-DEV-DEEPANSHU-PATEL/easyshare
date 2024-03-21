from flask import Flask, request, jsonify
from FaceMatch import recognize_face
import numpy as np  # Import NumPy
# Initialize Flask app
app = Flask(__name__)

# Route for face recognition
@app.route('/face-recognize', methods=['POST'])
def face_recognize():
    # Get data from the request
    request_data = request.json
    person_metadata = request_data.get('personImage')
    group_metadata = request_data.get('groupImage')
    
    result =  recognize_face(person_metadata,group_metadata)
    return jsonify(result)
if __name__ == '__main__':
    app.run(debug=True)
