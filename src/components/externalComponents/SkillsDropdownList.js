
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

const skills = [
    "Python", "Java", "JavaScript", "Go", "Ruby",
     "Dart", "PHP", "CSS", "HTML", "C++",
      "SQL", "MongoDB", "Angular", "React",
       "Vue", "Jquery", "TypeScript", "Unity","NodeJS",".NET","Perl","Usage of Frameworks","GitHub",
       "GitTalk", "Beanstalk","Perforce","Apache Subversion", "Responsive Design","Testing/Debugging",
];

function getStyles(skill, selectSkill, theme) {
    return {
        fontWeight:
        selectSkill.indexOf(skill) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function SkillsDropdownList() {
    const classes = useStyles();
    const theme = useTheme();
    const [selectSkill, setSelectSkill] = React.useState([]);

    const handleChange = (event) => {
        setSelectSkill(event.target.value);
    };

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setSelectSkill(value);
    };
    return (
        <div>
            <FormControl className={classes.formControl}>
              
                <Select
                    name="skills"
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={selectSkill}
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
                    {skills.map((skill) => (
                        <MenuItem key={skill} value={skill} style={getStyles(skill, selectSkill, theme)}>
                            {skill}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}