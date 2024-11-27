import React, {useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../css/searchbar.css'
import InfoModal from './InfoModal'

const SearchBar = ({locationMap, forecastArray}) => {

  const [searchValue, setSearchValue] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationAutoComplete = locationMap.map((location, index) => ({
    ...location,
    id: index + 1
  }));
    
      const formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
          </>
        )
      }
      const handleOnSelect = (item) => {
        setSearchValue(item.name);
        const locationObj = locationMap.find(location => location.name === item.name)
        handleShowModal(locationObj);
      }

      const handleOnInput = (name) => {
        setSearchValue(name); 
        const locationObj = locationMap.find(location => location.name === name)
        handleShowModal(locationObj);

      };


      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          const locationFound = locationMap.find(location => location.name === searchValue);
          if (!locationFound) {
            alert('Location is not found');
          } 
        }
      };
      const handleShowModal = (location) => {
        setSelectedLocation(location);
        setShowModal(true);
      };
      
      const handleCloseModal = () => {
          setShowModal(false);
          setSelectedLocation(null);
      };



      return (
        <div>
          <div className="searchbar" onKeyDown={handleKeyDown}>
            <ReactSearchAutocomplete styling={{backgroundColor: "white", border:false}}
            items={locationAutoComplete}
            onSelect={handleOnSelect}
            onSearch={handleOnInput}
            formatResult={formatResult}
            autoFocus
            />
          </div>
          {selectedLocation && (
            <InfoModal
              show={showModal}
              handleClose={handleCloseModal}
              location={selectedLocation}
              forecastArray={forecastArray}
            />
          )}
        </div>

      )
    }

export default SearchBar