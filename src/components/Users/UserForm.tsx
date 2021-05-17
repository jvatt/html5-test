import React, {useState, ReactNode} from 'react';
import {FormEvent} from "react";
import {User} from '../../interfaces';

type UserFormProps = {
    onConfirm: Function,
    user?: User,
    children?: ReactNode
}

const UserForm = ({ onConfirm, user, children }: UserFormProps) => {
    const [id] = useState(user?.id || "");
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");

    const confirm = (event: FormEvent) => {
        event.preventDefault();
        const user: User = {
            id,
            name,
            email,
            phone
        }
        setName("");
        setEmail("");
        setPhone("");
        onConfirm(user);
    }
    return (
        <form className="user-form" onSubmit={confirm}>
            <input
                className="user-form__input user-form__name"
                type="text"
                id="name"
                placeholder="Full name"
                title="The participants first and last name"
                required
                pattern="[\w\W]+(?: [\w\W]+)+"
                value={name}
                onChange={(event) => {
                    setName(event.target.value)
                }}
            />
            <input
                className="user-form__input user-form__email"
                type="email"
                id="email"
                placeholder="E-mail address"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                title="a valid email address e.g. john.doe@mymail.com"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
            />
            <input
                className="user-form__input user-form__phone"
                type="tel"
                id="phone"
                placeholder="Phone number"
                required
                pattern="^[+()\d][()\d -]+"
                title="a valid phone number e.g. +358 401234567 or 555-1234"
                value={phone}
                onChange={(event) => {
                    setPhone(event.target.value)
                }}
            />
            { children }
        </form>
    )
}

export default UserForm