import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';

const UserList = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h2>All Users</h2>
      {data.getUsers.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Married: {user.isMarried ? 'Yes' : 'No'}</p>
          <p>Position: {user.position}</p>
          <img alt="Profile" src={user.photoUrl} width="100" />
        </div>
      ))}
    </div>
  );
};

export default UserList;
