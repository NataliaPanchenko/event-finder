export default function EventsList({ events, isLoading, error }) {
  if (isLoading) return <h2>Loading...</h2>;
  if (error) {
    return <h2>Error</h2>;
  }
  console.log(events);

  if (!events || events.length === 0) {
    return <h3>No events found.</h3>;
  }
  return (
    <>
      {events?.map((event) => (
        <div key={event.id}>
          <h3>{event.titel}</h3>
          <p>{event.category}</p>
          <p>{event.location}</p>
          <p>{event.date}</p>
        </div>
      ))}
    </>
  );
}
