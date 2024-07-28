export default function UserProfile({ params }: any) {
  {
    console.log(params);
  }
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <div>
        <h2>Username</h2>
        <h2>{params.id}</h2>
      </div>
    </div>
  );
}
