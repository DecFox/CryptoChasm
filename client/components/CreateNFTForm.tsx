// next/react imports
import Link from 'next/link';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

// components
import Button from '../components/Button';

// contexts
import { UserContext } from '../contexts/UserContext';

// vendor imports
import 'remixicon/fonts/remixicon.css';

// styles
import styles from '../styles/components/form.module.scss';

function SettingsForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [invalid, setInvalid] = useState(false);

  const imagePreview = useRef<HTMLImageElement | null>(null);

  const validFileType = useCallback((file) => {
    const fileTypes = [
      'image/apng',
      'image/bmp',
      'image/gif',
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/svg',
    ];
    return file ? fileTypes.includes(file.type) : false;
  }, []);

  const imageOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files instanceof FileList ? setImage(e.target.files[0]) : null;
  };

  useEffect(() => {
    if (image && validFileType(image) && imagePreview && imagePreview.current) {
      setInvalid(false);
      imagePreview.current.src = URL.createObjectURL(image!);
      imagePreview.current.style.display = 'block';
    } else {
      imagePreview.current!.style.display = 'none';
      image === null ? setInvalid(false) : setInvalid(true);
    }
  }, [image]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image || !validFileType(image)) {
      imagePreview.current!.style.display = 'none';
      setInvalid(true);
      return;
    }
    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image!);

    // Post Logic
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.input_container}>
        <label htmlFor="image">Upload Image</label>
        <p>File types supported: JPG, PNG, SVG.</p>
        <label
          className={`${styles.image_label} ${invalid ? styles.invalid : ''}`}
          htmlFor="image"
        >
          <i className="ri-image-2-fill" />
          <img ref={imagePreview} alt="uploaded image preview" />
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={(e) => {
            imageOnchange(e);
          }}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Monke"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="Describe the NFT in a few words."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
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
