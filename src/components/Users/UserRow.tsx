import React, {useState} from 'react';
import {MdModeEdit, MdDelete} from 'react-icons/md'
import UserForm from './UserForm';
import {User} from '../../interfaces';
import './Users.css';
import '../../styles/Button.css';

type UserRowProps = {
    user: User
    onDelete: Function
    onEdit: Function
}

const UserRow = ({user, onDelete, onEdit}: UserRowProps) => {
    const [editing, setEditing] = useState(false);

    return editing ?
        // Editor ui
        (<tr className="user-row">
            <td colSpan={4} style={{padding: "0px"}}>
                <UserForm
                    user={user}
                    onConfirm={(user: User) => {
                        setEditing(false);
                        onEdit(user);
                    }}>
                    <div className="user-form__edit-controls">
                        <button className="button button--cancel"
                                style={{marginRight: "8px"}}
                                onClick={() => setEditing(false)}>Cancel
                        </button>
                        <button className="user-form__submit button button--ok" type="submit">Save
                        </button>
                    </div>
                </UserForm>
            </td>
        </tr>)
        :
        // Default table row
        (<tr className="user-row">
            <td onClick={() => setEditing(true)} className="user-row__cell user-row__name">{user.name}</td>
            <td onClick={() => setEditing(true)} className="user-row__cell user-row__email">{user.email}</td>
            <td onClick={() => setEditing(true)} className="user-row__cell user-row__phone">{user.phone}</td>
            <td className="user-row__cell user-row__controls">
                <button className="button button--icon" onClick={() => setEditing(true)}>
                    <MdModeEdit/>
                </button>
                <button className="button button--icon" onClick={() => onDelete()}>
                    <MdDelete/>
                </button>
            </td>
        </tr>)
}

export default UserRow