import React, { useContext, useState , useEffect} from "react";
import { fetchMethods} from "../components/FetchMethods";
import Select from "react-select";
import WithLoadingList from "../components/WithLoadingList";
import ListAttendanceUser from "../components/ListAttendanceUser";
//Muetsra la información del cliente
export const ManageUser = () => {


    const LoadingList = WithLoadingList(ListAttendanceUser);
    const [userdates, setUserDates] = useState([])
  
    const [AppStateLoading] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };
    const [refresh, setRefresh] = useState(true)
    const [barber, setBarber] = useState(1);
    const [client, setClient] = useState(null);
    const [clientSelect, setClientSelect] = useState(null);
    const [vectorClients, setvectorClients] = useState([]);


    useEffect(() => {
        if (refresh) {
            fetchMethods.getFetch(`citas/userAttendaceDetail/${client},${barber}`).then((res) => {
                setUserDates(res.data)
            });

            setRefresh(false);

        }

    }, [setUserDates,  refresh])

    useEffect(() => {
        if (refresh) {
            fetchMethods.getFetch(`citas/users`).then((res) => {
                    setvectorClients(res.data)
                    console.log(vectorClients)
                });

            setRefresh(false);
        }
    }, [ refresh])

    const handleClientChange = (client) => {
        setClientSelect(client); //Selecciona para que se mantenga la seleccion

        if (client && client.value) {
          setClient(client.value);
        } else {
          setClient("");
        }
        setRefresh(true);
    };

    const sendDataB = async (e) => {
        setBarber(e.target.value);

        setRefresh(true); //Refrezca cuando se selecciona el barbero

    }

    const options = vectorClients.map((client) => ({
      value: client.email,
      label: client.email
    }));

    const customStyles = {
        control: (provided) => ({
          ...provided,
          minHeight: '45px',
          height: '40px',
          borderRadius: '4px',
          fontSize: '14px'
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          padding: '4px'
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: 'none'
        }),
        menu: (provided) => ({
          ...provided,
          fontSize: '12px'
        }),
        option: (provided) => ({
          ...provided,
          fontSize: '12px'
        }),
        placeholder: (provided) => ({
            ...provided,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '12px'
          })
      };
    
    
    
    return (<h1>
        <div className="d-flex justify-content-center align-items-center">
           
           <div className="dropdown  col-xs-*">
                <select className="form-select" aria-label="Default select example" onChange={(e) => { sendDataB(e) }}>
                    <option value={1}>Andrés R</option>
                    <option value={2}>Michael</option>

                </select>
            </div>  

            <div style={{ marginLeft: '10px', minWidth: '200px' }}>
            <Select
                options={options}
                value={clientSelect}
                onChange={handleClientChange}
                isClearable
                placeholder="Buscar cliente"
                styles={customStyles}
            />
            </div>

        </div>

        <div>
            <LoadingList isLoading={AppStateLoading} contents={userdates} onRefresh={handleRefresh} />
        </div>

    </h1>)
}
