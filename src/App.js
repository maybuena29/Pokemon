import React, { useState, useEffect } from 'react';
import './App.css';
import { BiSearchAlt } from "react-icons/bi";
import { Button, Input, Modal, Popconfirm, notification } from 'antd';
import axios from 'axios';

const openNotif = (type) => {
  if(type === 'success'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Pokemon Added Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'warning'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Pokemon Removed Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'error'){
    notification[type]({
      message: 'ERROR!',
      description: 'There was an error executing the command.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else{
    notification[type]({
      message: 'SUCCESS!',
      description: 'Pokemon Updated Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }
};

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=10&offset=4'
      );
      const results = response.data.results;
  
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setPokemonData(pokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const handleOk = () => {
    setAddModal(false);
    setUpdateModal(false);
    setPokemonName('');
  };

  const addPokemon = async () => {
    try {
      if(pokemonName.trim().length === 0){
        openNotif('error');
      }else{
        const temp = pokemonName.toLowerCase();
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${temp}`
        );
        setPokemonData([...pokemonData, response.data]);
        openNotif('success')
      }
    } catch (error) {
      openNotif('error');
    }
    
    handleOk();
  }

  const updatePokemon = () => {
    try{
      if(pokemonName.trim().length === 0){
        openNotif('error')
      }else{
        const newData = pokemonData.filter(newPokeName => {
          if(newPokeName.id === pokemonTempID){
            newPokeName.name = pokemonName;
          }
          return newPokeName;
        });
    
        setPokemonData(newData);
        handleOk();
        openNotif('info');
      }
    }catch(e){
      openNotif('error');
    }
    
  }

  const [pokemonTempID, setPokemonTempID] = useState('');
  const fetchData = (pokemonID) => {
    const pokeName = pokemonData.filter( data => data.id === pokemonID);
    setPokemonName(pokeName.name);
    setPokemonTempID(pokemonID);
  }

  const deletePokemon = (pokemonID) => {
    try{
      const newData = pokemonData.filter( data => data.id !== pokemonID);
      setPokemonData(newData);
    }catch(e){
      openNotif('error');
    }
  }

  // Search
  const search = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchValue) ||
      item.types[0].type.name.toLowerCase().includes(searchValue)
    )
  }

  return (
      <div className="md:m-10">
        
        {/* Header */}
        <div className='fixed z-40 w-full bg-white md:static'>
          <div className='flex flex-col lg:flex-row w-full h-12 mt-5 mb-10'>
            <div className='lg:w-1/3 w-full flex items-center justify-center'>
              <p className='px-16 lg:px-5 text-3xl font-semibold tracking-wide text-gray-500 font-poppins'>List of Pokemon</p>
            </div>
            <div className='lg:w-1/3 w-full lg:px-0 px-10'>
              <Input style={{ fontSize: '16', borderColor: "#747C95" }} className='w-full rounded-2xl mr-3.5 lg:mt-2 mt-4 m-auto items-center font-poppins bor' placeholder='Search Pokemon...' suffix={<BiSearchAlt className="text-xl" style={{color: "#747C95" }}/>}
                    onChange = {(e) => {setSearchValue(e.target.value.toLowerCase())}} value={searchValue}/>
            </div>
            <div className='lg:w-1/3 w-full lg:px-0 px-10 lg:mt-0 mt-4'>
              <div className='relative w-full'>
                <div className='absolute right-0 lg:w-auto w-full'>
                  <Button className="lg:w-auto w-full h-10 px-10 my-auto text-xs font-medium tracking-wide border-0 rounded-lg font-poppins md:text-lg sm:text-base" style={{backgroundColor: '#46E4AC'}}
                    onClick={() => {
                      setAddModal(true);
                    }}>
                    <span>Add Pokemon</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex items-center justify-center w-full overflow-auto min-w-screen">
          <div className="lg:mt-0 sm:mt-44 md:mt-20 mt-48 grid grid-flow-row-dense grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
            
              {/* Pokemon Card */}
              {pokemonData && search(pokemonData).map((pokemon) => (
                <div className="relative float-left w-auto p-5 mt-2 border-2 rounded-lg shadow-md site-card-wrapper" key={pokemon.id}>
                  <div className="items-center justify-center w-full">
                    <div className="flex flex-col justify-center w-full gap-1 text-center">
                      <div className="flex items-center justify-center flex-auto p-10 pl-12 pr-12 border-b-1 bg-slate-400">
                        <img alt={pokemon.name} className="w-auto h-28" src={pokemon.sprites.front_default}/>
                      </div>
                      <p className="text-2xl price font-poppins" style={{textTransform: 'capitalize'}}>
                        <span className="price">{pokemon.name}</span>
                      </p>
                      <p className="text-sm text-gray-600 quantity overflow-ellipsis" style={{textTransform: 'capitalize'}}>
                        <span className="quantity">{pokemon.types[0].type.name}</span>
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full gap-1 pt-6 pb-2 mt-2 border-t-1">
                      <Button className="w-32 h-10 px-10 my-auto text-xs font-medium tracking-wide border-0 rounded-lg font-poppins md:text-lg sm:text-base" style={{backgroundColor: '#46E4AC'}} onClick={() => {fetchData(pokemon.id); setUpdateModal(true);}}>
                        <span>Edit</span>
                      </Button>
                      <Popconfirm title="Delete Pokemon?" onConfirm={() => deletePokemon(pokemon.id)} okText="Yes">
                        <Button className="h-10 px-10 my-auto text-xs font-medium tracking-wide border-0 rounded-lg w-30 font-poppins md:text-lg sm:text-base" style={{backgroundColor: '#ED5264'}}>
                          <span>Delete</span>
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              ))}
              
          </div>
        </div>

        {/* Modal For Adding Pokemon */}
        <Modal title={"Add Pokemon"} open={addModal} onOk={handleOk} onCancel={handleOk} width={300}
          footer={[
            <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4 rounded" type="primary" onClick={addPokemon}>Add</Button>,
            <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
          ]}>
            <div className='flex flex-col gap-4'>
              <div>
                <Input className='rounded-sm' value={pokemonName || ''} placeholder="Pokemon Name"
                  onChange={(e) => {
                      setPokemonName(e.target.value);
                  }}/>
              </div>
            </div>
        </Modal>

        {/* Modal For Updating Pokemon */}
        <Modal title={"Update Pokemon Name"} open={updateModal} onOk={handleOk} onCancel={handleOk} width={300}
          footer={[
            <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4 rounded" type="primary" onClick={updatePokemon}>Update</Button>,
            <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
          ]}>
            <div className='flex flex-col gap-4'>
              <div>
                <Input className='rounded-sm' value={pokemonName || ''} placeholder="Pokemon Name"
                  onChange={(e) => {
                      setPokemonName(e.target.value);
                  }}/>
              </div>
            </div>
        </Modal>

      </div>

      
  );
}

export default App;
