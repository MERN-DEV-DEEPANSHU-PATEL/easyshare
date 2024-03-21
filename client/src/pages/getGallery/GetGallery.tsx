import Gallery from "../../components/gallery/Gallery";
import { useParams } from "react-router-dom";

const GetGallery = () => {
  const { eventId, getAccessKey } = useParams();
  return (
    <div>
      {eventId && getAccessKey && (
        <Gallery eventId={eventId} getAccessKey={getAccessKey} />
      )}
    </div>
  );
};

export default GetGallery;
