// next/react imports
import Link from 'next/link';
import { useContext, useState } from 'react';

// components
import Button from '../components/Button';

// contexts
import { UserContext } from '../contexts/UserContext';

// vendor imports

// styles
import styles from '../styles/components/settingsForm.module.scss';

function SettingsForm() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  return (
    <form className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="name">Display Name</label>
        <input
          type="text"
          name="display-name"
          id="name"
          placeholder="Steve Rogers"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          id="bio"
          placeholder="Tell us about yourself in a few words."
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="steve.rogers@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="wallet">Wallet Address</label>
        <input
          type="text"
          name="wallet-address"
          id="wallet"
          placeholder="0x0000000000000000000000000000000000000000"
          value={''}
          data-copy="wallet"
          disabled
        />
      </div>
      <div className={styles.btn_container}>
        <Button type="submit" modifier="ghost" href="">
          Save
        </Button>
      </div>
    </form>
  );
}

export default SettingsForm;
