import React from "react";
import {client, clients, worker, workers} from "@app/utils/types/databaseTypes";

export type WorkStatusPikerProps = {
    value: 'בהמתנה' | 'בביצוע' | 'הושלם' | 'בעיה' | string,
    setTaskStatus: React.Dispatch<React.SetStateAction<WorkStatusPikerProps['value']>>
    onchange?: (item: WorkStatusPikerProps['value']) => void
}

export type OrgansStatusProps = {
    organsStatus: 'נמוכה' | 'בינונית' | 'גבוהה' | 'קריטית' | string,
    setOrgansStatus: React.Dispatch<React.SetStateAction<OrgansStatusProps['organsStatus']>>
}

export type locationPikerProps = {
    value: 'כניסה ראשית' | 'פינקוס' | 'אורנים' | 'תצוגות' | 'אשכולות' | 'מדרגות נשר' | 'מסדרון הקשתות' | 'מסדרון אורנים' | 'טדי' | 'טרקלין טדי' | 'דולצ׳ין' | 'גשר דולצ׳ין' | 'מטבח טדי' | 'בחר מיקום'
    setLocation: React.Dispatch<React.SetStateAction<locationPikerProps['value']>>
}


export type TimePikerProps = {
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<TimePikerProps['date']>>
    type: 'time' | 'date'
}

export type clientPikerProps = {
    value: client,
    values: clients,
    setValues: React.Dispatch<React.SetStateAction<client>>,
    onchange?: (item: client) => void
    title?: string
}

export type workerPikerProps = {
    value: worker,
    values: workers,
    setValues: React.Dispatch<React.SetStateAction<worker>>
    onchange?: (item: worker) => void
    title?: string
}
