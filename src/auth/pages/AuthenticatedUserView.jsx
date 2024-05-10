import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

const AuthenticatedUserView = ({ userData }) => {
  const [editingField, setEditingField] = useState('');
  const [editedData, setEditedData] = useState({});
  const [changesPending, setChangesPending] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedData(userData); 
  }, [userData]);

  useEffect(() => {
    const isDataEdited = Object.keys(userData).some(
      key => userData[key] !== editedData[key]
    );
    setChangesPending(isDataEdited);
  }, [userData, editedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validaciones
    let error = '';
    if (name === 'firstName' || name === 'lastName') {
      if (!/^[a-zA-Z]{3,25}$/.test(value)) {
        error = 'El nombre debe tener entre 3 y 25 letras.';
      }
    } else if (name === 'monopoly_go_url') {
      if (!/^https?:\/\/.+/.test(value)) {
        error = 'La URL debe comenzar con http:// o https://.';
      }
    }

    setErrors({ ...errors, [name]: error });

    if (!error) {
      setEditedData({ ...editedData, [name]: value });
    }
  };

  const handleUpdate = () => {
    const editableData = {
      firstName: editedData.firstName,
      lastName: editedData.lastName,
      monopoly_go_url: editedData.monopoly_go_url,
    };

    fetch('https://fnlclp5rqe.execute-api.us-east-1.amazonaws.com/dev/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Datos actualizados correctamente');
        setEditingField('');
      } else {
        console.error('Error al actualizar los datos:', response.status);
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
  };

  const handleEditField = (fieldName) => {
    setEditingField(fieldName);
  };


  return (
    <div className='login'>
      <div className='container_logout'>
        <div className='textAndImg'>
          <div>
            <h1 className='logout_text1'>Hola,</h1>
            <div className="editable-field">
              <div className="field">
                <span>{userData.firstName}</span>
                {editingField === 'firstName' ? (
                  <>
                    <input
                      className='input'
                      type="text"
                      name="firstName"
                      value={editedData.firstName || ''}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                  </>
                ) : (
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => handleEditField('firstName')} />
                )}
              </div>
              <div className="field">
                <span>{userData.lastName}</span>
                {editingField === 'lastName' ? (
                  <>
                    <input
                      className='input'
                      type="text"
                      name="lastName"
                      value={editedData.lastName || ''}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                  </>
                ) : (
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditField('lastName')} />
                )}
              </div>
              <div className="field">
                <span>{userData.monopoly_go_url}</span>
                {editingField === 'monopoly_go_url' ? (
                  <>
                    <input
                      className='input'
                      type="text"
                      name="monopoly_go_url"
                      value={editedData.monopoly_go_url || ''}
                      onChange={handleInputChange}
                    />
                    {errors.monopoly_go_url && <p className="error">{errors.monopoly_go_url}</p>}
                  </>
                ) : (
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditField('monopoly_go_url')} />
                )}
              </div>
            </div>
          </div>
        </div>
        {editingField && (
          <button className='btn_save' onClick={handleUpdate} disabled={!changesPending}>
            Actualizar
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthenticatedUserView;
