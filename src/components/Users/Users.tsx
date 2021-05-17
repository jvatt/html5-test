import React, {useState} from 'react';
import {v4 as uuid} from "uuid";
import UserForm from './UserForm';
import UserTable from './UserTable';
import {User} from '../../interfaces';
import {userData} from '../../data';
import '../../styles/Button.css';

const Users = () => {
    const sortByName = (arr: Array<User>, desc: boolean) => {
        const sorted = [...arr];
        return sorted.sort((a, b) => {
            return desc ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
        });
    }

    const sortByEmail = (arr: Array<User>, desc: boolean) => {
        const sorted = [...arr];
        return sorted.sort((a, b) => {
            return desc ? b.email.localeCompare(a.email) : a.email.localeCompare(b.email);
        });
    }

    const sortByPhone = (arr: Array<User>, desc: boolean) => {
        const sorted = [...arr];
        return sorted.sort((a, b) => {
            return desc ? b.phone.localeCompare(a.phone) : a.phone.localeCompare(b.phone);
        });
    }

    const sortUsers = (arr: Array<User>, sortBy: string) => {
        const desc = sortType === sortBy && !sortDescending;
        if (sortBy === "name") {
            setUsers(sortByName(arr, desc));
        } else if (sortBy === "email") {
            setUsers(sortByEmail(arr, desc));
        } else if (sortBy === "phone") {
            setUsers(sortByPhone(arr, desc));
        }
        setSortType(sortBy);
        setSortDescending(desc);
    }

    const addUser = (user: User) => {
        const newUsers = [...users, {...user, id: uuid()}];
        if (sortType === "name") {
            setUsers(sortByName(newUsers, sortDescending));
        } else if (sortType === "email") {
            setUsers(sortByEmail(newUsers, sortDescending));
        } else if (sortType === "phone") {
            setUsers(sortByPhone(newUsers, sortDescending));
        }
    }

    const editUser = (user: User) => {
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex > -1) {
            const newUsers = [...users];
            newUsers.splice(userIndex, 1, user);
            setUsers(newUsers);
        }
    }

    const deleteUser = (user: User) => {
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex > -1) {
            const newUsers = [...users];
            newUsers.splice(userIndex, 1);
            setUsers(newUsers);
        }
    }

    const [users, setUsers] = useState<Array<User>>(sortByName(userData, false));
    const [sortType, setSortType] = useState<string>("name");
    const [sortDescending, setSortDescending] = useState<boolean>(false);

    return (
        <div className="users">
            <div className="users__header">
                List of participants
            </div>
            <UserForm onConfirm={addUser}>
                <button className=" user-form__submit button" type="submit">Add new</button>
            </UserForm>
            <UserTable
                users={users}
                onEdit={editUser}
                onDelete={deleteUser}
                onSort={(sortBy: string) => sortUsers(users, sortBy)}
                sorting={{type: sortType, descending: sortDescending}}
            />
        </div>
    )

}

export default Users