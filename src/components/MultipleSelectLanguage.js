
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 500,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const languages = [
    "Python", "Java", "JavaScript", "Go", "Ruby",
     "Dart", "PHP", "CSS", "HTML", "C++",
      "SQL", "MongoDB", "Angular", "React",
       "Vue", "Jquery", "TypeScript", "Unity"
];

function getStyles(language, selectLanguage, theme) {
    return {
        fontWeight:
        selectLanguage.indexOf(language) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect() {
    const classes = useStyles();
    const theme = useTheme();
    const [selectLanguage, setselectLanguage] = React.useState([]);

    const handleChange = (event) => {
        setselectLanguage(event.target.value);
    };

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setselectLanguage(value);
    };
    return (
        <div>
            <FormControl className={classes.formControl}>
              
                <Select
                    name="languages"
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={selectLanguage}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {languages.map((language) => (
                        <MenuItem key={language} value={language} style={getStyles(language, selectLanguage, theme)}>
                            {language}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}