import { getDate } from "@/components/EventsList/EventItem/EventItem";
import Link from "next/link";

export default function EventPage({ event }) {
  if (!event) return <h2>Event not found</h2>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{getDate(event.date)}</p>
      <p>{event.location.name}</p>
      <p>{event.category.name}</p>
      <p>{event.description}</p>
      <p>{event.price}</p>
      <p>{event.availableTickets}</p>
      <Link href="/">
        <p>Back to Homepage</p>
      </Link>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const dbConnect = (await import("@/db/connect")).default;
  const Event = (await import("@/db/models/Events")).default;
  await import("@/db/models/Categories");
  await import("@/db/models/Locations");

  await dbConnect();

  const event = await Event.findById(params.id)
    .populate(["category", "location"])
    .lean();

  if (!event) return { notFound: true };

  event._id = event._id.toString();
  if (event.category?._id) event.category._id = event.category._id.toString();
  if (event.location?._id) event.location._id = event.location._id.toString();

  return { props: { event } };
}
