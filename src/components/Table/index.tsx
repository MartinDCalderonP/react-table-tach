import { IUser } from "../../common/interfaces";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const tableFields = ["name", "username", "email", "address"];

const Table = () => {
  const { data, loading, error } = useFetch<IUser[]>(API_URL);

  return (
    <>
      {loading && <Loader />}
      {error && data?.length === 0 && <p>Error: {error}</p>}
      {data && data.length > 0 && (
        <table>
          <thead>
            <tr>
              {tableFields.map((field) => (
                <th key={field}>{field}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{`${user.address.street}, ${user.address.city}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
