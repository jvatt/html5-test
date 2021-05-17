import React from "react";
import UserRow from "./UserRow";
import {User} from "../../interfaces";
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import '../../styles/common.css';

type Sorting = {
    type: string
    descending: boolean
}

type UserTableProps = {
    users: Array<User>
    onEdit: Function
    onDelete: Function
    onSort: Function
    sorting: Sorting
}

const UserTable = ({users, onEdit, onDelete, onSort, sorting}: UserTableProps) => {
    const arrow = sorting.descending ? <MdArrowDownward style={{paddingLeft: "8px"}}/> : <MdArrowUpward style={{paddingLeft: "8px"}}/>
    return (<table className="user-table">
        <tbody>
        <tr className="user-row">
            <th onClick={() => onSort("name")} className="user-row__name user-table__header unselectable">
                <div className="user-table__header-content">
                    Name {sorting.type === "name" ? arrow : null }
                </div>
            </th>
            <th onClick={() => onSort("email")} className="user-row__email user-table__header unselectable">
                <div className="user-table__header-content">
                    E-mail address {sorting.type === "email" ? arrow : null }
                </div>
            </th>
            <th onClick={() => onSort("phone")} className="user-row__phone user-table__header unselectable">
                <div className="user-table__header-content">
                    Phone number {sorting.type === "phone" ? arrow : null }
                </div>
            </th>
        </tr>
        {
            users.map((user: User) => {
                return <UserRow
                    key={user.id}
                    user={user}
                    onDelete={() => onDelete(user)}
                    onEdit={onEdit}
                />
            })
        }
        </tbody>
    </table>);
}

export default UserTable