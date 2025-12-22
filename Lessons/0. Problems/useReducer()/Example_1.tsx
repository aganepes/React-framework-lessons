/*
2. Form Management (Multiple Inputs)
Birden fazla input'u tek bir state nesnesi üzerinden yönetmek.
*/
import { useReducer } from 'react';

function formReducer(state, action) {
  return {
    ...state,
    [action.field]: action.value
  };
}

function UserForm() {
  const [state, dispatch] = useReducer(formReducer, { username: '', email: '', age: '' });

  const handleChange = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value
    });
  };

  return (
    <form>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      
      <div style={{ marginTop: '20px' }}>
        <strong>Preview:</strong> {state.username} | {state.email} | {state.age}
      </div>
    </form>
  );
}
export default UserForm;