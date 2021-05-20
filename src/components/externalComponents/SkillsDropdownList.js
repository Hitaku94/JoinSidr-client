import React, { useState } from 'react';
import MultiSelect from "react-multi-select-component";

const SkillsDrop = (props) => {
  const options = [
    { value: "HTML/CSS", label: "HTML/CSS" },
  { value: "Java", label: "Java" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "NodeJS", label:"NodeJS"  },
  { value: "Ruby", label: "Ruby" },
  { value: "PHP", label:"PHP"  },
  { value: ".NET", label: ".NET" },
  { value: "C#", label: "C#" },
  { value: "JQuery", label: "JQuery" },
  { value: "Python", label: "Python" },
  { value: "Perl", label:"Perl"  },
  { value: "Usage of Frameworks", label:"Usage of Frameworks"  },
  { value: "GitHub", label: "GitHub" },
  { value: "GitTalk", label: "GitTalk" },
  { value: "Beanstalk", label: "Beanstalk" },
  { value: "Perforce", label:"Perforce"  },
  { value: "Apache Subversion", label:"Apache Subversion" },
  { value: "AWS CodeCommit", label:"AWS CodeCommit"  },
  { value: "Responsive Design", label:"Responsive Design"  },
  { value:"Testing/Debugging", label: "Testing/Debugging" },
  ];

  const [selected, setSelected] = useState([]);
  const changeHandler = selected => {
    setSelected(selected)
  }

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
      name= "skills"
        options={options}
        value={selected} 
        onChange={changeHandler}
        labelledBy="Select"
      />
    </div>
  );
};

export default SkillsDrop