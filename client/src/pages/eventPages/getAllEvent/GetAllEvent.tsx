import { useCallback, useEffect, useState } from "react";
import ImageCard from "../../../components/cards/ImageCard";
import { makeRequest } from "../../../hooks/usePrivateAxios";
import Spinner from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";

const GetAllEvent = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getAllEvent = useCallback(async () => {
    const { data } = await makeRequest.get("/user/event");
    setEvents(data.events);
    // console.log(data.events);
    setIsLoading(false);
  }, []);

  const onClick = useCallback(async (eventId) => {
    navigate(`/event/${eventId}`);
  }, []);

  useEffect(() => {
    getAllEvent();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : events ? (
    <div className="eventsContainer">
      <div className="flex flex-col sm:flex-row m-10 p-10">
        {events.map((event) => (
          <ImageCard
            key={event._id}
            img={event.eventPoster.url}
            title={event.eventName}
            onClick={() => onClick(event._id)}
          />
        ))}
      </div>
    </div>
  ) : (
    <h1>
      Loading please refresh afeter sometime....... <Spinner />
    </h1>
  );
};

export default GetAllEvent;
