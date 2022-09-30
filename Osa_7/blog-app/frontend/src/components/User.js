const User = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <a href={`/users/${user.id}`}>{user.name}</a>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default User;
