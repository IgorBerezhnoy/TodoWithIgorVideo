import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';

type SuperCheckBoxPropsType = {
    isDone:boolean
    callback:(newIsDoneValue:boolean)=>void
}

export const SuperCheckBox = (props: SuperCheckBoxPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.callback(newIsDoneValue)
    };

    return (
        <Checkbox
            checked={props.isDone}
            color="primary"
            onChange={onChangeHandler}
        />
    );
};

