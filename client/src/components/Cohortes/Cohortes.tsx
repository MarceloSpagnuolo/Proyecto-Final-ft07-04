import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {  useDispatch, useSelector } from "react-redux";
import AddCohorte from "./Add";
import Listado from "./Listado";
import Historial from "./Historial";
import "components/Cohortes/Cohortes.css";
import {getCohortes} from "../../Store/Actions/Cohortes"

function Cohortes() {
  const dispatch = useDispatch();
  const cohortes: any = useSelector(Cohortes => Cohortes)
  useEffect(() => {
    dispatch(getCohortes())
  }, []);


  return (
    <div>
      <Tabs id="Cohorte-Tab">
        <TabList id="Cohorte-TabList">
          <Tab>Cohortes</Tab>
          <Tab>Nuevo Cohorte</Tab>
          <Tab>Historial</Tab>
        </TabList>
        <TabPanel>
          <Listado listado={cohortes} />
        </TabPanel>
        <TabPanel>
          <AddCohorte />
        </TabPanel>
        <TabPanel>
          <Historial listado={cohortes}/>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Cohortes;
