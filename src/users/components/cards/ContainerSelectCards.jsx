import React, { useEffect, useState } from 'react'
import './styles/ContainerSelectCard.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowUpRightDots, faHandHolding, faSearch } from '@fortawesome/free-solid-svg-icons';
import ModalDetalle from './page/components/ModalDetalle';

const ContainerSelectCards = ({
  redirectTo,
  textSearchSelect,
  textofferingSlect,
  textStartexchange1,
  textStartexchange2,
  selectedCardsSearch,
  selectedCardsOffer,
  colorContainer1,
  colorContainer2,
  colorContainer3,
  textColor
}) => {


  const [isModalOpenDetalle, setIsModalOpenDetalle] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpenDetalle(true);
  };
  const closeModalDetalle = () => {
    setIsModalOpenDetalle(false);
  };

  const handleClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      openModal(); 
    } else {
      navigate(redirectTo);    
    }

  };


  return (
    <>
      {isModalOpenDetalle && <ModalDetalle isModalOpenDetalle={isModalOpenDetalle} closeModalDetalle={closeModalDetalle}/>}
      <div
        className='containerSelect'
        style={{ backgroundColor: colorContainer1 ? colorContainer1 : (colorContainer2 ? colorContainer2 : colorContainer3) }}
        onClick={handleClick}
      >
        <div>
          <p className='text1'>
            {textSearchSelect ?
              textSearchSelect
              : (textofferingSlect ?
                textofferingSlect
                : textStartexchange1
              )}
          </p>
          <p className='text2' style={{ color: textColor }}>{selectedCardsSearch ? selectedCardsSearch?.length : (selectedCardsOffer ? selectedCardsOffer?.length : textStartexchange2)} Cartas</p>
        </div>
        <p className='text1' >
          {textSearchSelect ?
            textSearchSelect && <FontAwesomeIcon icon={faSearch} />
            : (textofferingSlect ?
              textofferingSlect && <FontAwesomeIcon icon={faHandHolding} />
              : textStartexchange1 && <FontAwesomeIcon icon={faArrowUpRightDots} />
            )}
        </p>
      </div>
    </>
  )
}

export default ContainerSelectCards;
