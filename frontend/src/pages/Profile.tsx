import React, { useEffect, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { axiosInstanceWithAuth } from '../api/Axios';

const Profile: React.FC = () => {
  const { entryData, fetchProfileData } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (entryData) {
      setFormData({
        fullname: entryData.fullname || '',
        image: entryData.image || '',
      });
      setImagePreview(entryData.image || '');
    }
  }, [entryData]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prevData) => ({
          ...prevData,
          image: base64String
        }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosInstanceWithAuth.put("/users", {
      fullname: formData.fullname,
      image: formData.image,
    });
    setIsEditing(false);
    fetchProfileData();
  };

  return (
    <div className="h-screen flex items-center justify-start flex-col">
      <h1 className="text-3xl font-semibold text-center mt-10">Your Profile</h1>

      <div className="flex flex-col w-80 items-center justify-center mt-10">
        <div className="relative w-32 h-32 hover:opacity-40 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center opacity-100 bg-black bg-opacity-50 rounded-full">
            <img
              src={imagePreview === '' ? 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg' : imagePreview}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        </div>
        <form className="flex flex-col gap-4 mt-8 w-full" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm">Full Name</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              autoComplete="name"
              className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 disabled:bg-gray-200"
              value={formData.fullname}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <span>Username: <span className="font-bold">{entryData.username}</span></span>
          </div>
          <span>Happiness Points: <span className="font-bold">{entryData.happinessPoints}</span></span>
          <div>

            {isEditing ? (
              <>
                <label className="block text-gray-700 text-sm">Profile Picture</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  onChange={handleImageChange}
                />
              </>
            ) : null}
          </div>
          {isEditing && (
            <button
              type="submit"
              className="mt-4 w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Save
            </button>
          )}
        </form>
      </div>

      {!isEditing && (
        <div className="mt-8 w-80 mx-auto" title="Edit Profile Button">
          <button
            onClick={handleEditClick}
            className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
