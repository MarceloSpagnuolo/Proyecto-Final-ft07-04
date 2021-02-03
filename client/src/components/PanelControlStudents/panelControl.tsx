import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./panelControl.css";
import Invitation from "./InvitacionAlumnos/Invitacion";
import Students from "./AllStudents/students";

const PanelControl = (): JSX.Element => {

    return (
        <div className="PCS-container">
            <div className="PCS-intro">
                <h1 id='titulo-pc'>Panel de Control</h1>
                <h3 id='texto-pc'>Este es tu panel de control de alumnos, desde aqui podras gestionar los alumnos nuevos, como los ya registrados.</h3>
            </div>
            <div id='tab-container'>
                <div className="PCS-tabs">
                    <Tabs id="PC-tabs">
                        <TabList id="PCS-tabList">
                            <Tab id="PCS-tab">Invitar Alumnos</Tab>
                            <Tab id="PCS-tab">Estudiantes</Tab>
                        </TabList>
                        <TabPanel id="PCS-tabPanel"> <Invitation /> </TabPanel>
                        <TabPanel id="PCS-tabPanel"> <Students /> </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    )

}

export default PanelControl;