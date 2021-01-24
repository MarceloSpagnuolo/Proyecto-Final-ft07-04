import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./panelControl.css";
import Invitation from "./InvitacionAlumnos/Invitacion";
import Students from "./AllStudents/students";

const PanelControl = (): JSX.Element => {

    return (
        <div className="">
            <div className="">
                <h1>Panel de Control</h1>
                <h3>Este es tu panel de control de alumnos, desde aqui podras gestionar los alumnos nuevos, como los ya registrados.</h3>
            </div>
            <div className="">
                <Tabs>
                    <TabList>
                        <Tab >Invitar Alumnos</Tab>
                        <Tab >Estudiantes</Tab>
                    </TabList>
                    <TabPanel> <Invitation /> </TabPanel>
                    <TabPanel> <Students /> </TabPanel>
                </Tabs>
            </div>
        </div>
    )

}

export default PanelControl;