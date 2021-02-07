import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AddCohorte from "./Add";
import Listado from "./Listado";
import Historial from "./Historial";
import "components/Cohortes/Cohortes.css";
import {countAlumnos} from "../../Store/Actions/Cohortes"
import { useDispatch } from "react-redux";


function Cohortes() {
  const dispatch = useDispatch()
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    dispatch(countAlumnos())
    setFlag(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="cohortes">
      <div id="subcohor">
        <Tabs id="Cohorte-Tab">
          <TabList id="Cohorte-TabList">
            <Tab>Cohortes</Tab>
            <Tab>Nuevo Cohorte</Tab>
            <Tab>Historial</Tab>
          </TabList>
          <TabPanel>
            <Listado flag={flag}/>
          </TabPanel>
          <TabPanel>
            <AddCohorte />
          </TabPanel>
          <TabPanel>
            <Historial />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Cohortes;
