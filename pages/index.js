export default function HomePage({ events, error, isLoading }) {
  if (isLoading) return <h2>Loading...</h2>;
  if (error) {
    return <h2>Error</h2>;
  }
  console.log(events);
  return (
    <div>
      <h1>Hello from 🎟Event Finder App 👋🏻</h1>
    </div>
  );
}
