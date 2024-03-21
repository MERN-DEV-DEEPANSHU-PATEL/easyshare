import { google } from "googleapis";
import { cred } from "../cred.js";

export const auth = new google.auth.GoogleAuth(
  cred.web.client_id,
  cred.web.client_secret,
  cred.web.redirect_uris[0]
);

export const drive = google.drive({ version: "v3", auth });
const SCOPES = [
  "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/drive.activity.readonly https://www.googleapis.com/auth/drive.activity	 https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file",
];
export const genereateUrl = (req, res) => {
  const authUrl = auth.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.json({ url: authUrl });
};

export const genrateToken = (req, res) => {
  auth.getToken(req.query.code, (err, token) => {
    if (err) console.log(err);
    res.json({ token });
  });
};

export const getProfileData = (req, res) => {
  auth.setCredentials(req.body.token);
  const oauth = google.oauth2({ version: "v2", auth: auth });

  oauth.userinfo.get((err, response) => {
    if (err) console.log(err);
    res.send(response.data);
  });
};

export const getDriveFile = (req, res) => {
  auth.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: auth });

  drive.files.list(
    {
      pageSize: 200,
    },
    (err, response) => {
      if (err) console.log(err);
      const files = response.data.files;
      res.send(files);
    }
  );
};

export const downloadFile = (req, res) => {
  auth.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: auth });
  console.log(req.params.id);
  drive.files.get(
    {
      fileId: req.params.id,
      alt: "media",
    },
    { responseType: "stream" },
    async (err, response) => {
      if (err) {
        console.log(err);
      } else {
        await response.data
          .on("end", () => console.log("Done"))
          .on("error", () => console.log("error"))
          .pipe(res);
      }
    }
  );
};
